import React from 'react'
import backgroundImage from '../assets/userImage/background.jpg';
import './background.scss';

const Background = () => {
    return (
        <div className='backImage'>
            <img src={backgroundImage} alt='BackgroundImage' />
        </div>
    )
}

export default Background
