
// const express = require('express');
// const spotifyWebApi = require('spotify-web-api-node');
// const path = require('path');
// require('dotenv').config({path: '.env'});

import express from 'express';
import spotifyWebApi from 'spotify-web-api-node';
import path from 'path';
import { config } from 'dotenv';
import cors from 'cors'

config( {path: path.join(process.cwd(), '.env')} );

const router = express.Router();
const port = 8080;

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

var app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true
}));

//testing
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!!!`)
});

//state
// var generateRandomString = function (length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };




// // Request User Authorization

// router.get('/auth/login', (req, res) => {

//   console.log("I AM IN HERE NOW");

//   var scope = 'user-top-read \
//               user-library-read \
//               user-read-currently-playing \
//               user-read-recently-played \
//               user-read-playback-state \
//               user-modify-playback-state \
//               user-library-modify'

    
//   var state = generateRandomString(16);

//   var auth_query_parameters = new URLSearchParams({
//     response_type: "code",
//     client_id: client_id,
//     scope: scope,
//     redirect_uri: 'localhost:3000/auth/callback',
//     state: state
//   })
//   var loginUrl = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString()
//   console.log(loginUrl)

//   res.redirect(loginUrl);
// })


// // Request Access Token

// app.get('/auth/callback', (req, res) => {

//   var code = req.query.code;

//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: "http://localhost:3000/auth/callback",
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//       'Content-Type' : 'application/x-www-form-urlencoded'
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.redirect('/')
//     }
//   });
// })


// // Return Access Token

// app.get('/auth/token', (req, res) => {
//   res.json(
//      {
//         access_token: access_token
//      })
// })










// const spotifyApi = new SpotifyWebApi({
//   clientId: client_id,
//   clientSecret: client_secret,
//   redirectUri: redirect_uri,
// });

// app.get('/login', (req,res) => {
//   const scopes = [
//         'user-top-read', // ---> top artists
//         'user-library-read',
//         'user-read-currently-playing',
//         'user-read-recently-played', // ---> what user has listened to
//         'user-read-playback-state',
//         'user-modify-playback-state',
//         'user-library-modify' // ---> add albums to their library
//     ];

//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
// });


// app.get('/auth/callback', (req, res) => {
//   const error = req.query.error;
//   const code = req.query.code;
//   const state = req.query.state;
//   if(error){
//     console.error('Errors:', error);
//     res.send(`Error: ${error}`);
//     return;
//   };

//   spotifyApi.authorizationCodeGrant(code).then(data => {
//     const accessToken = data.body('accew')

//   });



// });



//console.log(client_id, redirect_uri)


// app.get('/auth/login', (req, res) => {
// });

// app.get('/auth/callback', (req, res) => {
// });

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`)
// })



// const port = process.env.PORT || 8080;

// //console.log(port)

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const redirect_uri = process.env.REDIRECT_URI;

// console.log(client_id)
// console.log(client_secret)
// console.log(redirect_uri)




// // Set up server
// const app = express();
// app.use(express.json());


// //permissions
// const scopes = [
//     'user-top-read', // ---> top artists
//     'user-library-read',
//     'user-read-currently-playing',
//     'user-read-recently-played', // ---> what user has listened to
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-library-modify' // ---> add albums to their library
// ];


// // Authentication
// export const authEndpoint = 'https://accounts.spotify.com/authorize';

// // export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}
// // &scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

// export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&show_dialog=true`;



// app.get('/login', (req,res) => {
//     console.log(loginUrl)
//     res.redirect(loginUrl)

// });

// app.get('/login', (req, res) => {
//     console.log("I am in here.....")
//     res.send({ loginUrl });

// });



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


