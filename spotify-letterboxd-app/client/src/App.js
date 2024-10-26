import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import Dashboard from './components/Dashboard/Dashboard.js'
import Hero from './components/Hero/Hero.js'
import { Profile } from './components/Profile/Profile.js';
// import Recommended from './components/Recommended/Recommended.js'
import { LandingPage } from './components/LandingPage/LandingPage.js';
import {getHashParams} from './utils/index.js'
import { logout } from './spotify/spotify.js'



const App = () => {

  console.log("entered App component");

  const [accessToken, setAccessToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const { access_token } = getHashParams();
    if (access_token) {
      setAccessToken(access_token);
      setIsAuthorized(true);
      // Optionally, store it in local storage
      localStorage.setItem('access_token', access_token);
      window.location.hash = "";
    } else {
      // Retrieve from local storage if not present in URL
      const storedToken = localStorage.getItem('access_token');
    
      if (storedToken) {
        setAccessToken(storedToken);
        setIsAuthorized(true);
        window.location.hash = "";
      }
      else {
        setIsAuthorized(false);
      }
    }

    console.log("is Authorized is", isAuthorized);

    // if(!accessToken || accessToken === undefined){
    //   setIsAuthorized(false);
    // }

   
  }, []);

  console.log("isAuthorized", isAuthorized)

  

  return (
    <div className="app" id = 'root'>

        
          <Header isAuthorized = {isAuthorized} />    
          {(!isAuthorized || accessToken === undefined) ? <LandingPage /> : <Dashboard />  }
      {/* Popular Albums */}
    </div>
  );
}

export default App;
