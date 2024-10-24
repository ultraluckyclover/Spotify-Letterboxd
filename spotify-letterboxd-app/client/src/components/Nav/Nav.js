import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import FaceIcon from '@mui/icons-material/Face';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Nav = () => {
  return (
    <div className = 'navBar'>

        <div className = 'navDir'>
            <div>
                <Link to ='/profile'>
                    <FaceIcon  fontSize = 'large' />
                    <p>Friends</p>
                </Link>
            </div>
            <div>
                <Link to = '/diary'>
                    <AutoStoriesIcon />
                    <p>Diary</p>
                </Link>
                
            </div>
            <div>
                <Link to = '/reviews'>
                    <ReviewsIcon />
                    <p>Reviews</p>
                </Link>
            </div>
            <div>
                <Link to = '/to-listen'>
                    <MusicNoteIcon />
                    <p>2Listen2</p>
                </Link>
            </div>
            <div>
                <Link to = '/lists'>
                    <FormatListBulletedIcon />
                    <p>Lists</p>
                </Link>
            </div>

            <div>
                <Link to = '/likes'>
                    <FavoriteIcon />
                    <p>Likes</p>
                </Link>
            </div>
        </div>
        

        <div className = 'github'>
            <a href = ''>
                <GitHubIcon fontSize = 'large' />
            </a>
            
        </div>
    </div>

    

  )
}
