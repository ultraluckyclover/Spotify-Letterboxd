import axios from 'axios';
import { useSpotifyAuth } from '../auth.js';


// API Calls -----------------------------

const useSpotifyApi = () => {
  const { accessToken } = useSpotifyAuth();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  //search
  const getSearch = (q) => 
  axios.get(`https://api.spotify.com/v1/search?q=${q}&type=artist,track,album&limit=10`, {headers});

  //get artist
  const getArtist = (artistId) => 
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {headers});

  //get artist's albums
  const getArtistAlbums = (artistId) => 
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {headers});

  //get recommended
  const getRelatedArtists = (artistId) => 
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {headers});

  //user's saved albums 
  const getSavedAlbums = () => 
  axios.get('https://api.spotify.com/v1/me/albums', {headers});

  return { getSearch, getArtist, getArtistAlbums, getRelatedArtists, getSavedAlbums };
}

export default useSpotifyApi;