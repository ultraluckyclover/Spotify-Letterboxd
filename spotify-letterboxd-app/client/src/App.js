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
import { getSpotifyAuth } from './spotify/spotify.js';



const App = () => {

  const { isAuthorized, accessToken } = getSpotifyAuth();

  console.log("accessToken in App.js", accessToken);
  console.log("isAuthorized in App.js", isAuthorized);

  return (
    <div className="app" id = 'root'>

        
          <Header isAuthorized = {isAuthorized} />    
          {(!isAuthorized || accessToken === undefined) ? <LandingPage /> : <Dashboard />  }
      {/* Popular Albums */}
    </div>
  );
}

export default App;
