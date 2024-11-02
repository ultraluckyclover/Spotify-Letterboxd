import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import Dashboard from './components/Dashboard/Dashboard.js'
import { LandingPage } from './components/LandingPage/LandingPage.js';
import { useSpotifyAuth } from './auth.js'



const App = () => {

  const { isAuthorized, accessToken } = useSpotifyAuth();

  console.log("accessToken in App.js", accessToken);
  console.log("isAuthorized in App.js", isAuthorized);

  return (
    <div className="app" id = 'root'>

          <Header isAuthorized = {isAuthorized} />    
          {(!isAuthorized || accessToken === undefined) ? <LandingPage /> : <Dashboard />  }
    </div>
  );
}

export default App;
