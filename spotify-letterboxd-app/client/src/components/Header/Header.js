<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import Login from '../Login/Login.js'





const Header = () => {

    console.log('in header');
    
    return(
    <div className = 'header'>
        
    <header>
        <div className = 'headerLogo'>   
            <h1 className = 'appName'> Spotify Letterboxd </h1>
        </div> 

        <div className = 'headerInput'>
            <input className = 'searchBox ' type = 'text' placeholder = 'Search for an album, artist, or song' />
            <SearchIcon className = 'headerInputBtn'
            style = {{ fontSize: '45px'}}/>
        </div>

        <div className = 'headerSign'>
            {/* <a href = 'google.com' > <strong>Sign in</strong></a> */}
            <Login />
        </div>

    </header>
    </div>
)}


export default Header

=======
import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
//import { loginUrl } from '../../server/server.js';
import { logout } from '../../spotify/spotify.js';
>>>>>>> 62cbf2a4 (Fixed auth)

//import styles from './style'
// import SearchIcon from './images/search-icon.png'
//import SearchIcon from '@mui/icons-material/Search';


// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

//font-family: "Karla", sans-serif;

// https://www.cameronsworld.net/img/content/16/19.gif

/* <img src = 'https://www.cameronsworld.net/img/content/19/26.gif'
        alt = 'skull with trumpet'/> */

<<<<<<< HEAD



=======
const proxy = 'http://localhost:8080';
const log = `${proxy}/login`
const Header = ({ isAuthorized }) => (
    
<div className = 'header'>
    {isAuthorized && (


    <header>
        <div className = 'headerLogo'>   
            <h1 class = 'appName'> Spotify Letterboxd </h1>
        </div> 

        <div className = 'headerInput'>
            <input class = 'searchBox ' type = 'text' placeholder = 'Search for an album, artist, or song' />
            <SearchIcon className = 'headerInputBtn'
            style = {{ fontSize: '45px'}}/>
        </div>

        <div class = 'headerSign'>
            <button onClick = { logout }> <strong>Logout</strong></button>
        </div>

    </header>
    
    )}

    {!isAuthorized && (

        <header>
        <div className = 'headerLogo'>   
            <h1 class = 'appName'> Spotify Letterboxd </h1>
        </div> 

        {/* <div className = 'headerInput'>
            <input class = 'searchBox ' type = 'text' placeholder = 'Search for an album, artist, or song' />
            <SearchIcon className = 'headerInputBtn'
            style = {{ fontSize: '45px'}}/>
        </div> */}

        <div class = 'headerSign'>
            <a href = {log} > <strong>Sign In</strong></a>
        </div>

        </header>

    )}

    </div>
    
)


export default Header
>>>>>>> 62cbf2a4 (Fixed auth)
