import React from 'react'
import MoviesCards from '../../assets/Common/MoviesCards';
import MoviesList from '../../assets/json/moviesList.json'


const TvShows = ({useAuth}) => {
    return (
        <div className='text-white container-xxl mt-lg-5' useAuth={useAuth}>
            {
                MoviesList.tvshows.map((users, key) => (
                    <MoviesCards key={key} image={users.image} title={users.title} descr={users.descr} />
                ))
            }
        </div>
    )
}

export default TvShows
