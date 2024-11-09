
// const express = require('express');
// const spotifyWebApi = require('spotify-web-api-node');
// const path = require('path');
// require('dotenv').config({path: '.env'});

import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import querystring from 'querystring'
import mongoose from 'mongoose'
import { User } from "./models/User.model.js"


// MIDDLEWARES ------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '.env') }); // Make sure to use the correct directory for .env

const port = 8080;
const app = express();



//  MONGOOSE  ---------------------------------------------------

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("index.js is connected");
    })
    .catch(e => console.error(e));

// AUTHORIZATION ------------------------------------------------

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:8080/callback';
const frontend_uri = process.env.FRONTEND_URI;

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});

// Generate a random state string
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

app.get('/', (req, res) => {
    res.send('Welcome to the Spotify API Server!'); // Welcome message
});

app.get('/login', (req,res) => {

    const state = generateRandomString(16);
    console.log('state is', state);

    //permissions
    const scopes = [
        'user-top-read', // ---> top artists
        'user-library-read',
        'user-read-currently-playing',
        'user-read-recently-played', // ---> what user has listened to
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-modify' // ---> add albums to their library
    ];

    // Authentication
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

// callback after user connects their Spotify account

app.get('/callback', async (req, res) => {
    const { error, code, state } = req.query;

    // Check for any error in the callback
    if (error) {
        console.log("Error:", error);
        res.send(`Error: ${error}`);
        return;
    }

    try {
        // Step 1: Get the authorization code grant
        const data = await spotifyApi.authorizationCodeGrant(code);
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        // Set the access and refresh tokens on the Spotify API object
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        //  Automatically refresh the access token before it expires
        setInterval(async () => {
            try {
                const refreshData = await spotifyApi.refreshAccessToken();
                const accessTokenRefreshed = refreshData.body['access_token'];
                
                // Set the new refreshed access token
                spotifyApi.setAccessToken(accessTokenRefreshed);
                console.log("Access Token refreshed:", accessTokenRefreshed);
            } catch (error) {
                console.error("Error refreshing access token:", error);
            }
        }, (expiresIn - 60) * 1000); // Refresh token 1 minute before it expires

        //  Get the user data from Spotify
        const userData = await spotifyApi.getMe();

        const { id: username, display_name, images } = userData.body;

        //  Check if the user exists in the database
        let user = await User.findOne({ username });

        if (user) {
            // If the user exists, update their profile with the new data
            user.displayName = display_name;
            user.imageUrl = images[0]?.url || '';
            await user.save();
            console.log('User updated:', user);

        } else {
            // If the user doesn't exist, create a new user document
            const newUser = new User({
                username,
                displayName: display_name,
                imageUrl: images[0]?.url || '',
                createdAt: Date.now()
            });
            await newUser.save();
            console.log('New user created:', newUser);
        }

        // Step 5: Redirect to the frontend with the tokens
        res.redirect(`${frontend_uri}/#${querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
        })}`);
    } catch (error) {
        console.error('Error handling user data or authorization:', error);
        res.send('Error handling user data or authorization.');
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!!!`)
});