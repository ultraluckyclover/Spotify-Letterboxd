import { useState, useEffect } from 'react';
import { getHashParams } from './utils/index.js';

export const useSpotifyAuth = () => {

  const [accessToken, setAccessToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {

    // if tokens are in URL
    const { access_token } = getHashParams();
    if ( !accessToken && access_token ) {
      setAccessToken(access_token);
      setIsAuthorized(true);
      // Optionally, store it in local storage
      localStorage.setItem('access_token', access_token);
      window.location.hash = ""; // clear tokens from URL after storing them locally
    } else {
      // Retrieve from local storage if not present in URL
      const storedToken = localStorage.getItem('access_token');
    

      if (storedToken) {
        setAccessToken(storedToken);
        setIsAuthorized(true);
        window.location.hash = "";
      }
      else {
        setIsAuthorized(false); // not authorized, needs to login with spotify
      }
    }

    console.log("is Authorized in spotify.js", isAuthorized);
    console.log("accessToken from spotify.js", accessToken);

    // if(!accessToken || accessToken === undefined){
    //   setIsAuthorized(false);
    // }

  }, [accessToken, isAuthorized]);

  return { isAuthorized, accessToken }
}

export const logout = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.location.reload();

    window.location.hash = '';

    // Reload the page to reflect the changes
    window.location.reload();
};
