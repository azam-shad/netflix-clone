import React from 'react'
import MoviesCards from '../../assets/Common/MoviesCards';
import MoviesList from '../../assets/json/moviesList.json'

const Homes = () => {
    return (
        <div className='text-white container-xxl'>
            {
                MoviesList.popular.map((users, key) => (
                    <MoviesCards key={key} image={users.image} title={users.title} descr={users.descr} />
                ))
            }
        </div>
    )
}

export default Homes
