
// const express = require('express');
// const spotifyWebApi = require('spotify-web-api-node');
// const path = require('path');
// require('dotenv').config({path: '.env'});

import express from 'express';
import spotifyWebApi from 'spotify-web-api-node';
import path from 'path';
import { config } from 'dotenv';

config( {path: path.join(import.meta.url, '.env')})

const port = process.env.PORT || 8080;

//console.log(port)

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;


// Set up server
const app = express();

//testing
app.listen(port, () => {
    console.log(`Server is listening on port ${port}!!!`)
});

//permissions
const scopes = [
    'user-top-read', // ---> top artists
    'user-library-read',
    'user-read-currently-playing',
    'user-read-recently-played', // ---> what user has listened to
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-modify' // ---> add albums to their library
]

// Authentication
export const authEndpoint = 'https://accounts.spotify.com/authorize';

export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}
&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`




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


