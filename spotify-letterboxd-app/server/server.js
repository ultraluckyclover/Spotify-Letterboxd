import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import querystring from 'querystring';
import mongoose from 'mongoose';
import { User } from './models/User.model.js';
import userRoutes from './routes/User.route.js';
import expressSession from 'express-session';

// MIDDLEWARES ------------------------------------------------

const port = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, '.env') }); // Ensure to use the correct directory for .env

const session_secret = process.env.SESSION_SECRET;

app.use(expressSession({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { } // Adjust cookie settings based on your environment
}));

// MONGOOSE CONNECTION ----------------------------------------

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
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// WELCOME ROUTE ------------------------------------------------

app.get('/', (req, res) => {
    res.send('Welcome to the Spotify API Server!'); // Welcome message
});

// LOGIN ROUTE --------------------------------------------------

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    console.log('state is', state);

    // Permissions
    const scopes = [
        'user-top-read', 
        'user-library-read',
        'user-read-currently-playing',
        'user-read-recently-played', 
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-modify'
    ];

    // Authentication
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

// SESSION MIDDLEWARE ------------------------------------------

app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user; // Set user to the request object if exists in session
    } else {
        req.user = null; // If no user in session, set it to null
    }
    next();
});

// CALLBACK ROUTE ------------------------------------------------

app.get('/callback', async (req, res) => {
    const { error, code, state } = req.query;

    // Check for any error in the callback
    if (error) {
        console.log("Error:", error);
        res.send(`Error: ${error}`);
        return;
    }

    try {
        // Get the authorization code grant
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

        // Check if the user exists in the database
        let user = await User.findOne({ username });

        if (user) {
            // If the user exists, update their profile with the new data
            user.displayName = display_name;
            user.imageUrl = images[0]?.url || '';
            await user.save();
            console.log('User updated:', user);
            
            req.session.user = user; // Ensure session is updated here
            req.user = user; // Add user to the request object
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
            req.session.user = newUser; // Ensure session is updated here
            req.user = newUser; // Add user to the request object
        }

        // Redirect to the frontend with the tokens
        res.redirect(`${frontend_uri}/#${querystring.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
        })}`);
    } catch (error) {
        console.error('Error handling user data or authorization:', error);
        res.send('Error handling user data or authorization.');
    }
});

// LOG USER SESSION ------------------------------------------

app.use((req, res, next) => {
    console.log('Session User:', req.session.user); // Log session user
    console.log('Request User:', req.user); // Log user in the request object
    next();
});

// API ROUTES ---------------------------------------------------

app.use('/api/user', userRoutes);



// START -------------------------------------------------

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!!!`)
});


