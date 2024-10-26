import { getHashParams } from "../utils/index.js";
import axios from 'axios';


// https://github.com/bchiang7/spotify-profile/blob/main/client/src/spotify/index.js
// helper code


// TOKENS ******************************************************************************************

// const fetchAccessToken = async () => {
//   try {
//     console.log("in fetch access Token");
//     const { data } = await axios.get('/token'); 
//     console.log("access token in spotify.js: ", data.access_token)
//     return data.access_token;
//   } catch (error) {
//     console.error("Error fetching access token:", error);
    
//   }
// };

// // A function to retrieve and cache the access token
// export const getAccessToken = async () => {
//   const token = await fetchAccessToken();
//   return token;
// };

// const token = getAccessToken();
// console.log("token:", token)




export const logout = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.location.reload();

    window.location.hash = '';

    // Reload the page to reflect the changes
    window.location.reload();
  };

// API calls


// const headers = {
//   Authorization: `Bearer ${token}`,
//   'Content-Type': 'application/json',
// };


// export const getSearch = (q) => {
//   console.log("in serch...");
//   const response = axios.get(`https://api.spotify.com/v1/search?q=${q}&type=artist`, {headers});
//   console.log("search....." ,response.data)};

//get artist
// export const getArtist = (artistId) => 
//   axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {headers});

// //get artist's albums
// export const getArtistAlbums = (artistId) => 
//   axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {headers});

// //get recommended
// export const getRelatedArtists = (artistId) => 
//   axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {headers})

// //user's saved albums 
// export const getSavedAlbums = () => 
//   axios.get('https://api.spotify.com/v1/me/albums', {headers})






// export const getAccessToken = () => {
//   const {error , access_token, refresh_token } = getHashParams();

//   if (error){
//     console.error(error);
//     // refreshAccessToken();
//   }



// }



// export const getAccessToken = () => {
//   const {error, access_token, refresh_token} = getHashParams();

//   if (error) {
//     console.error(error);
//   }

//   const localAccessToken = getLocalAccessToken();

//   if (( !localAccessToken || localAccessToken === 'undefined') && access_token){
//     setLocalAccessToken(access_token);
//     setLocalRefreshToken(refresh_token);
//     return access_token;
//   }
//   return localAccessToken;
// }

// export const token = getAccessToken();


// const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
// const setLocalAccessToken = token => {
//   setTokenTimestamp();
//   window.localStorage.setItem('spotify_access_token', token);
// };
// const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
// const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
// const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');

// // Access token automatically refreshes, this ensures I have the most updated token
// const fetchLatestAccessToken = async () => {

//   try {
//     const response = await axios.get('/token');
//     if (!response){
//       console.log("No response......");
//     }
//     const { access_token } = response.data;
//     if ( access_token ) {
//       setLocalAccessToken( access_token );
//       return access_token;
//     } 
//   } catch (error) {
//     console.error('Error fetching latest access token:', error);
//     logout();
//   }
// };

// // get access token locally
// export const getAccessToken = async () => {
//   const { error, access_token, refresh_token } = getHashParams();

//   //if hash params didnt fetch correctly
//   if (error) {
//     console.error(error);
//   }

//   const localAccessToken = getLocalAccessToken();

//   //if there is no local access token stored
//   if ((!localAccessToken | localAccessToken === 'undefined') && access_token) {
//     console.log('Access token found in URL. Storing it locally.');
//     setLocalAccessToken(access_token);
//     setLocalRefreshToken(refresh_token);
//     return access_token;
//   }

//   if (!localAccessToken) {
//     console.warn('Fetching access token from server.');
//     const fetchedToken = await fetchLatestAccessToken();
//     console.log('Fetched Access Token from server:', fetchedToken);
//     if (fetchedToken){
//       setLocalAccessToken(fetchedToken);
//     }
//     console.error('Failed to fetch token from server.');
//     return null;
//   }
//   console.log('Returning local access token:', localAccessToken);
//   return localAccessToken;
// };

// export const token = getAccessToken();
