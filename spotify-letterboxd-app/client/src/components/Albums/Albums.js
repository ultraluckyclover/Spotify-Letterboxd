import React from 'react'
import { Album } from '../Album/Album.js'
import './Albums.css'

export const Albums = () => {
  return (

    <div className = 'albumList'>
        <Album />
        <Album />
        <Album />
        <Album />
    </div>

  )
}
