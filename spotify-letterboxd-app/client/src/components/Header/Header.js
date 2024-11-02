import React , {useState} from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { logout } from '../../auth.js';
import { Link } from 'react-router-dom'
import  useSpotifyApi  from '../../spotify/spotify.js'


const proxy = 'http://localhost:8080';
const log = `${proxy}/login`
const Header = ({ isAuthorized }) =>  {

    const [searchTerm, setSearchTerm] = useState('');
    const { getSearch } = useSpotifyApi(); 

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Search term submitted:", searchTerm);
        if (searchTerm) {
            try {
                const results = await getSearch(searchTerm); // Call your API with the search term
                console.log(results.data); // Handle/display your search results as needed
            } catch (error) {
                console.error("Error fetching search results:", error); // Handle errors appropriately
            }
        }
    };

    return (
        <div className = 'header'>
            {isAuthorized && (
            <header>
                <div className = 'headerLogo'>   
                    <h1 className = 'appName'> Spotify Letterboxd </h1>
                </div> 

                <form className = 'headerInput' onSubmit={handleSearch}>
                    <input 
                        className = 'searchBox' 
                        type = 'text' 
                        placeholder = 'Search for an album, artist, or song'
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <button type='submit' >
                        <SearchIcon className='headerInputBtn'style={{ fontSize: '45px'}} />
                    </button>
                </form>

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
                        <Link to = { log } > <strong>Sign In</strong></Link>
                    </div>
                </header>
            )}
            </div>
    )   
}


export default Header