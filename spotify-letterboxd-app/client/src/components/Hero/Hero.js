<<<<<<< HEAD
import React, {useState,useRef, useEffect} from 'react'
=======
import React from 'react'
>>>>>>> 62cbf2a4 (Fixed auth)
//import Image from 'next/image';


import './Hero.css'
import heroImage from '../../images/hero-image-2.png'
import '../../fonts/gill-sans-mt-pro-cyrillic-medium.otf'


<<<<<<< HEAD
// window.onload = function () {
=======
// window.onload =  () => {
>>>>>>> 62cbf2a4 (Fixed auth)

//   console.log('ONLOAD')

//   var heightImg = (document.getElementsByClassName('heroImg')[0].width);
//   console.log(heightImg);
<<<<<<< HEAD
//   document.getElementsByClassName('hero')[0].style.height = heightImg + 'px';
// };

const Hero = () => {






=======

//   document.getElementsByClassName('hero')[0].style.height = heightImg + 'px';

// };

const Hero = () => {
>>>>>>> 62cbf2a4 (Fixed auth)
  return (


    <div className = 'hero'>
        <div className = 'heroContainer'>
            <div className = 'heroLeft'>
                <h1>Catalog your favorite music. Discover even more.</h1>
                <div className = 'phrase'>
                  <p>Your favorite musician's favorite app.</p>
                </div>
                <div className = 'button'>
                <a className = 'startBtn' href = 'google.com'><strong>Get started</strong></a>
                </div>
                
            </div>

            <div className = 'heroRight'>
                <img className = 'heroImg' src = {heroImage} alt = 'hero-image'></img>
            </div>





        </div>
    </div>
  )
}

export default Hero