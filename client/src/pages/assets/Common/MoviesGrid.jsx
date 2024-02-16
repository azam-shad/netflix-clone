import React from 'react'
import './moviesGrid.scss'
import { Link } from 'react-router-dom'

const MoviesGrid = ({ title, images, subTitle, link }) => {
    return (
        <div className='main-container ms-3 flex-row'>
            <div className='location' id='home'>
                <div className='titles'>
                    <h1 id='home'>{title}</h1>
                    <Link to={link}>{subTitle}</Link>
                </div>
                <div className="box mt-1">
                    {/* <Link to={'#'} ><img src={images} alt={`PopularImage ${images}`} /></Link> */}
                    {images && images.map((image, index) => (
                        <Link to={'#'} key={index}><img key={index} src={image} alt={`PopularImage ${index + 1}`} /></Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MoviesGrid