import React, { useEffect, useState } from 'react'
import MoviesCards from '../../assets/Common/MoviesCards';
import MoviesList from '../../assets/json/moviesList.json'
import Loders from '../../assets/Common/Loders';

const Homes = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);
    if (loading) {
        return (
            <Loders />
        );
    }
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
