import React from 'react'
import ScrollToTop from '../ScrollToTop/ScrollToTop.js';
import { Nav } from '../Nav/Nav.js';
import Recommended from '../Recommended/Recommended.js';
import { Albums } from '../Albums/Albums.js';
import './Dashboard.css'
import Hero from '../Hero/Hero.js'
import { Route, Routes } from 'react-router-dom'
import { Error } from '../Error/Error.js';
import { Profile } from '../Profile/Profile.js';
import { Home } from '../Home/Home.js';
import { Diary } from '../Diary/Diary.js';
import { Reviews } from '../Reviews/Reviews.js';
import { ToListen } from '../ToListen/ToListen.js';



const Dashboard = () => {
    // const accessToken = useAuth(code);
  return (

    

    <div className = 'dashboard'>
      <Nav />
      
        <Routes>
          <Route path = '/' element = { <Home />}/>
          <Route path = '/profile' element = { <Profile/> } />
          <Route path = '/diary' element = { <Diary/> }/>
          <Route path = '/reviews' element = { <Reviews/> }/>
          <Route path = '/to-listen' element = { <ToListen /> } />
          
          <Route path = '*' element = { <Error/> }/>
        </Routes>

      {/* <div className = 'wrapper'>
        <Albums />
        <Albums />
      </div>
      
      {/* <ScrollToTop>

      </ScrollToTop> */}

    </div>  
  )
}

export default Dashboard