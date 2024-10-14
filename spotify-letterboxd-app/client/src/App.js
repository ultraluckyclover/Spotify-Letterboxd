// import React, {useState, useEffect} from 'react';
import './App.css';

// import WebPlayback from './components/Webplayback/Webplayback.js'
// import Login from './components/Login/Login.js'
// import axios from 'axios'
import Header from './components/Header/Header.js'
import Hero from './components/Hero/Hero.js'
import Recommended from './components/Recommended/Recommended.js'


const App = () => {

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