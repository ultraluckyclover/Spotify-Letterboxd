import React from 'react'
import './Nav.css'
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
                <FaceIcon  fontSize = 'large' />
                <p>Friends</p>
            </div>
            <div>
                <AutoStoriesIcon />
                <p>Diary</p>
            </div>
            <div>
                <ReviewsIcon />
                <p>Reviews</p>
            </div>
            <div>
                <MusicNoteIcon />
                <p>2Listen2</p>
            </div>
            <div>
                <FormatListBulletedIcon />
                <p>Lists</p>
            </div>
            <div>
                <FavoriteIcon />
                <p>Likes</p>
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
