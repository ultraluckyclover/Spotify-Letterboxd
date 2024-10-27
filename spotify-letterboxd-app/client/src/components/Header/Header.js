import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
//import { loginUrl } from '../../server/server.js';
import { logout } from '../../spotify/spotify.js';
import { Link } from 'react-router-dom'


const proxy = 'http://localhost:8080';
const log = `${proxy}/login`
const Header = ({ isAuthorized }) => (
    
<div className = 'header'>
    {isAuthorized && (
    <header>
        <div className = 'headerLogo'>   
            <h1 className = 'appName'> Spotify Letterboxd </h1>
        </div> 

        <div className = 'headerInput'>
            <input 
                className = 'searchBox ' 
                type = 'text' 
                placeholder = 'Search for an album, artist, or song' 
                />
            
            <SearchIcon 
                className = 'headerInputBtn'
                style = {{ fontSize: '45px'}}/>
        </div>

        <div className = 'headerSign'>
            <button onClick = { logout }> <strong>Logout</strong></button>
        </div>

    </header>
    
    )}

    {!isAuthorized && (

        <header>
        <div className = 'headerLogo'>   
            <h1 className = 'appName'> Spotify Letterboxd </h1>
        </div> 

        <div className = 'headerSign'>
            <a href = { log } > <strong>Sign In</strong></a>
        </div>

        </header>

    )}

    </div>
    
)


export default Header