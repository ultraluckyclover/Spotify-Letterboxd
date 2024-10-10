import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
//import { loginUrl } from '../../server/server.js';

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


const Header = () => (
    <div className = 'header'>
        
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
            <a href = 'google.com'> <strong>Sign in</strong></a>
        </div>

    </header>
    </div>
)


export default Header