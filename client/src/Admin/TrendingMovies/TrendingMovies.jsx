import React, { useState, useEffect } from 'react';
import Cards from '../assets/Cards';

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const responce = await fetch(`http://localhost:5000/adminData/moviesDetails`);
                const data = await responce.json();
                const rowsWithId = data.trandMovies.map((row, index) => ({ ...row, id: index + 1 }));
                setMovies(rowsWithId)
                // console.log('data.adminMoviesList: ', data.adminMoviesList)
                console.log('movies List: ', rowsWithId);
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchTrendingMovies();
    }, []);

    return (
        <div>
            <h3>Top 3 Trending Movies</h3>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id}>
                        <Cards movie_title={movie.title} release_date={movie.release_date} genres={movie.genres} average_rating={movie.average_rating} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingMovies;
