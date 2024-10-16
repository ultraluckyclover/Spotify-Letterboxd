<<<<<<< HEAD
// import React, {useState, useEffect} from 'react';
import './App.css';

// import WebPlayback from './components/Webplayback/Webplayback.js'
// import Login from './components/Login/Login.js'
// import axios from 'axios'
import Header from './components/Header/Header.js'
import Hero from './components/Hero/Hero.js'
import Recommended from './components/Recommended/Recommended.js'

//import { loginUrl } from '../../../../server/server.js';


// const code = new URLSearchParams(window.location.search).get('code')


function App()  {

  return(

  <div className="app">
    <Header/>
    <Hero/>
    <Recommended />
 
    {/* Popular Albums */}
  </div>
  )

}

export default App;


// const [loginUrl,setLoginUrl] = useState('')

//   useEffect ( () => {
//     const fetchLoginUrl = async () => {
//       console.log("Insode FETCH")
//       try {
//         const response = await axios.get('http://localhost:3001/login');
//         setLoginUrl(response.data.loginUrl);

//         console.log("inside TRY block")

//       } catch (error) {
//         console.log('Error fetching login URL: ', error)
//       }
//     };
//     fetchLoginUrl();
//   }, []);
=======
import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header.js'
import Hero from './components/Hero/Hero.js'
import { Profile } from './components/Profile/Profile.js';
// import Recommended from './components/Recommended/Recommended.js'
import { LandingPage } from './components/LandingPage/LandingPage.js';
import {getHashParams} from './utils/index.js'



const App = () => {

  const [accessToken, setAccessToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const { access_token } = getHashParams();
    if (access_token) {
      setAccessToken(access_token);
      setIsAuthorized(true);
      // Optionally, store it in local storage
      localStorage.setItem('access_token', access_token);
    } else {
      // Retrieve from local storage if not present in URL
      const storedToken = localStorage.getItem('access_token');
    
      if (storedToken) {
        setAccessToken(storedToken);
        setIsAuthorized(true);
      }
      else {
        setIsAuthorized(false);
      }
    }
  }, []);

  return (
    <div className="app">

        <script>
          alert('Hello from the front end.')
        </script>
        
        <Header isAuthorized = {isAuthorized} />
        {accessToken ? <Profile /> : <LandingPage /> }

      
      {/* Popular Albums */}
    </div>
  );
}

export default App;
>>>>>>> 62cbf2a4 (Fixed auth)
