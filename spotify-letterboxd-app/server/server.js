
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



//  MONGOOSE  -------------------------------------------------

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("index.js is connected");
    })
    .catch(e => console.error(e));

//     run()
// async function run() {

//     try {
//         const user = await User.findOne().byUsername('testusername');
//         console.log(user)
//         user.sayHi()
//     } catch (e) {
//         console.log(e.message)
//     }
// }

// async function deleteAllUsers() {
//     try {
//         const result = await User.deleteMany({});
//         console.log(`${result.deletedCount} users were deleted.`);
//     } catch (error) {
//         console.error("Error deleting users:", error);
//     }
// }
// deleteAllUsers();





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

    // const authEndpoint = 'https://accounts.spotify.com/authorize';

    // const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${frontend_uri}
    // &scope=${scopes.join('%20')}&response_type=code&show_dialog=true`

    // console.log(loginUrl);

    // res.redirect(loginUrl);

});

// callback after user connects their Spotify account

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error){
        console.log("Error:", error);
        res.send(`Error: ${error}`)
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data => {
        // Extract tokens from the response
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];
    
        // Set the access and refresh tokens on the Spotify API object
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
    
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
    
        // Automatically refresh the access token before it expires
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
    
        // Redirect to the frontend with the tokens
        res.redirect(`${frontend_uri}/#${querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
        })}`);
    
    }).catch(error => {
        console.log("Error getting token:", error);
        res.send('Error getting token.');
    });
    

    // spotifyApi.authorizationCodeGrant(code).then(data => {
    //     const accessToken = data.body['access_token'];
    //     const refreshToken = data.body['refresh_token'];
    //     const expiresIn = data.body['expires_in'];

    //     spotifyApi.setAccessToken(accessToken);
    //     spotifyApi.setRefreshToken(refreshToken);


    //     console.log(accessToken, refreshToken);
        
    //     res.redirect(
    //         `${frontend_uri}/#${querystring.stringify({
    //           access_token,
    //           refresh_token,
    //         })}`,
    //       );
        
    // }).catch(error => {
    //     console.log("Error: ", error);
    //     res.send('Error getting token.')
    // })

})

// app.get('/token' , (req,res) => {
//     console.log("in /token");
//     const accessToken = spotifyApi.getAccessToken();
//     console.log('accessToken', accessToken);
//     if (accessToken) { 
//         res.json( {access_token: accessToken});
//     } else {
//         res.status(401).json( {error: "NO access token."});
//     }
// });

// API REQUESTS ------------------------------------------------

app.get('/search', (req,res) => {
    const {q} = req.query;
    spotifyApi.searchTracks(q).then(searchData => {
        const trackUri = searchData.body.tracks.items(0).uri;
        res.send({uri: trackUri})
    }).catch(err=> {
        res.send(`Error searching ${err}`);
    });
})

// app.get('/play', (req, res) => {
//     const {uri} = req.query;
//     spotifyApi.play({uris: [uri]}).then( () => {
//         res.send('playback started');

//     }).catch(err => {
//         res.send(`Error playing ${err}`);
//     })
    
// });


//testing
app.listen(port, () => {
    console.log(`Server is listening on port ${port}!!!`)
});









// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src/app.js'));
// });







// app.get('/src/app.js', (req,res) => {
//     console.log("Here")
//     res.send("HI")
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src/app.js'));

// });


// const server = app.listen(PORT, () => {
//     console.log("Server is listening on port 8080")
// })

// const signals = ["SIGTERM", "SIGINT"];

// function gracefulShutdown(signal){
//     process.on(signal, async () => {
//         server.close();
//         //disconnect from db

//         console.log("My work here is done.....")
//         process.exit(0);
//     })
// }

// for(let i = 0; i < signals.length; i++){
//     gracefulShutdown(signals[i]);
// };


