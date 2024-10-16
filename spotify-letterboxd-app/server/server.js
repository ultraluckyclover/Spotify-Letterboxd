import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request';

// Load environment variables
config({ path: path.join(process.cwd(), '.env') });

const app = express();
const port = 8080;

// Use middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify your client origin
  credentials: true // Allow credentials to be included (optional)
}));
app.use(cookieParser()); // Ensure cookie parser middleware is used

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:8080/auth/callback';
const frontend_uri = 'http://localhost:3000';

// Generate a random state string
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

// Define the /auth/login route
app.get('/auth/login', function (req, res) {
  console.log("Entering /auth/login"); // Log entry to the route
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Define the scope of access
  const scope = 'user-top-read user-library-read user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state user-library-modify';

  const redirectUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  })}`;

  console.log('Redirecting to... ', redirectUrl); // Log the redirect URL
  res.redirect(redirectUrl);
});

// Define the /auth/callback route
app.get('/auth/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  console.log('entered auth/callback/')

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
          'base64',
        )}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {

      console.log("Response Status Code:", response.statusCode);
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${frontend_uri}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
        'base64',
      )}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!!!`);
});




// // const express = require('express');
// // const spotifyWebApi = require('spotify-web-api-node');
// // const path = require('path');
// // require('dotenv').config({path: '.env'});

// import express from 'express';
// import path from 'path';
// import { config } from 'dotenv';
// import cors from 'cors'
// import SpotifyWebApi from 'spotify-web-api-node';
// import querystring from 'querystring'
// import cookieParser from 'cookie-parser';


// config( {path: path.join(process.cwd(), '.env')} );

// const router = express.Router();
// const port = 8080;

// var app = express();
// app.use(cors({
//   origin: 'http://localhost:3000', // Specify your client origin
//   credentials: true // Allow credentials to be included (optional)
// }));
// app.use(cookieParser());


// var client_id = process.env.CLIENT_ID;
// var client_secret = process.env.CLIENT_SECRET;
// var redirect_uri = 'http://localhost:8080/auth/callback';
// var frontend_uri = 'http://localhost:3000';

// // app.get('/auth/login', (req,res) => {
// //   const code = req.body.code;
// //   const spotifyApi = new SpotifyWebApi( {
// //     redirectUri: frontend_uri,
// //     clientId: client_id,
// //     clientSecret: client_secret
// //   }) 

// //   spotifyApi.authorizationCodeGrant(code).then(data => {
// //     res.json({
// //       accessToken: data.body.access_token,
// //       refreshToken: data.body.refresh_token,
// //       expiresIn: data.body.expires_in
// //     })
// //   }).catch(() => {
// //     res.sendStatus(400)
// //   })
// // });


// // var client_id = process.env.CLIENT_ID;
// // var client_secret = process.env.CLIENT_SECRET;
// // var redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8080';
// // var frontend_uri = process.env.FRONTEND_URI || 'http://localhost:3000';

// //testing
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}!!!`)
// });


// // https://accounts.spotify.com/authorize?response_type=code&client_id=c6b11a9dc1494e018cccf151a733e95a&scope=user-top-read%20user-library-read%20user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-modify-playback-state%20user-library-modify&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&state=LtbRdjhPVz7Tf2HE

// var generateRandomString = function (length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// const stateKey = 'spotify_auth_state';

// app.get('/auth/login', function (req, res) {

//   console.log("entering /auth/login")
//   const state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   const scope =
//     'user-top-read user-library-read user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state user-library-modify';


//     const redirecrUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: `${redirect_uri}`,
//       state: state,
//     })}`

//     console.log('redirecting to... ', redirecrUrl)

//   res.redirect(redirecrUrl);
// });


// app.get('/auth/callback', function (req,res) {
//   console.log("i am here now");


// })


// app.get('/auth/callback', function (req, res) {
//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   const code = req.query.code || null;
//   console.log('code', code)
//   const state = req.query.state || null;
//   console.log('state', state)
//   const storedState = req.cookies ? req.cookies[stateKey] : null;
//   console.log('stored state:', storedState);

//   if (state === null || state !== storedState) {
//     res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
//   } else {
//     res.clearCookie(stateKey);
//     const authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: `${redirect_uri}/auth/callback`,
//         grant_type: 'authorization_code',
//       },
//       headers: {
//         Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//           'base64',
//         )}`,
//       },
//       json: true,
//     };

//     request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         const access_token = body.access_token;
//         const refresh_token = body.refresh_token;

//         // we can also pass the token to the browser to make requests from there
//         res.redirect(
//           `${frontend_uri}/#${querystring.stringify({
//             access_token,
//             refresh_token,
//           })}`,
//         );
//       } else {
//         res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
//       }
//     });
//   }
// });



// app.get('/auth/callback', function (req, res)) {
//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
//   } else {
//     const authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code',
//       },
//       headers: {
//         Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//           'base64',
//         )}`,
//       },
//       json: true,
//     };


    // app.get('/callback', function (req, res) {
    //   // your application requests refresh and access tokens
    //   // after checking the state parameter
  
    //   const code = req.query.code || null;
    //   const state = req.query.state || null;
    //   const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    //   if (state === null || state !== storedState) {
    //     res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    //   } else {
    //     res.clearCookie(stateKey);
    //     const authOptions = {
    //       url: 'https://accounts.spotify.com/api/token',
    //       form: {
    //         code: code,
    //         redirect_uri: redirect_uri,
    //         grant_type: 'authorization_code',
    //       },
    //       headers: {
    //         Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    //           'base64',
    //         )}`,
    //       },
    //       json: true,
    //     };
  
    //     request.post(authOptions, function (error, response, body) {
    //       if (!error && response.statusCode === 200) {
    //         const access_token = body.access_token;
    //         const refresh_token = body.refresh_token;
  
    //         // we can also pass the token to the browser to make requests from there
    //         res.redirect(
    //           `${FRONTEND_URI}/#${querystring.stringify({
    //             access_token,
    //             refresh_token,
    //           })}`,
    //         );
    //       } else {
    //         res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
    //       }
    //     });
    //   }
    // });



    // app.get('/refresh_token', function (req, res) {
    //   // requesting access token from refresh token
    //   const refresh_token = req.query.refresh_token;
    //   const authOptions = {
    //     url: 'https://accounts.spotify.com/api/token',
    //     headers: {
    //       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    //         'base64',
    //       )}`,
    //     },
    //     form: {
    //       grant_type: 'refresh_token',
    //       refresh_token,
    //     },
    //     json: true,
    //   };
  
    //   request.post(authOptions, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //       const access_token = body.access_token;
    //       res.send({ access_token });
    //     }
    //   });
    // });
  
    // // All remaining requests return the React app, so it can handle routing.
    // app.get('*', function (request, response) {
    //   response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
    // });


// app.get('/auth/login', (req, res) => {

//   console.log("Entered auth/login endpoint...")

//   var scope = "streaming \
//                user-read-email \
//                user-read-private"

//   var state = generateRandomString(16);

//   var auth_query_parameters = new URLSearchParams({
//     response_type: "code",
//     client_id: client_id,
//     scope: scope,
//     redirect_uri: "http://localhost:3000/auth/callback",
//     state: state
//   })

//   const redir = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
//   console.log('redir... ', redir)

//   res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
// })

// app.get('/auth/callback', (req, res) => {

//   var code = req.query.code;
//   console.log('Received code: ', code)

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


// app.get('/auth/token', (req, res) => {
//   console.log('In /auth/token')
//   res.json(
//      {
//         access_token: access_token
//      })
// })



// // state
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
//     redirect_uri: 'http://localhost:3000/auth/callback',
//     state: state
//   })

//   // `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=response_type&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&show_dialog=true`;
//   var loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=response_type&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&show_dialog=true`;
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


