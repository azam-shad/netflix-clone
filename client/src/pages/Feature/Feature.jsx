import React from 'react';
import './feature.scss';
import rightSideImage from '../assets/tv.png'
import videoTv from '../assets/video-tv-in-0819.m4v'

const Feature = () => {
    return (
        <div className='features'>
            <hr />
            <div className='container text-white'>
                <div className='leftSide'>
                    <h1>Enjoy on your TV</h1>
                    <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                </div>
                <div className='rightSide'>
                    <img src={rightSideImage} alt='TV' />
                    <video src={videoTv} autoPlay loop controls={false} />
                </div>
            </div>

        </div>

    )
}

export default Feature
