import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userColumn } from '../assets/moviesTable';
import '../assets/coreDataTable.scss';
import { Link } from 'react-router-dom';

const MoviesList = () => {
    const [moviesRow, setMoviesRow] = useState([]);
    useEffect(() => {
        const moviesLists = async () => {
            try {
                const responce = await fetch(`http://localhost:5000/adminData/moviesDetails`);
                const data = await responce.json();
                const rowsWithId = data.adminMoviesList.map((row, index) => ({ ...row, id: index + 1 }));
                setMoviesRow(rowsWithId)
                console.log('movies List: ', rowsWithId);
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        moviesLists();
    }, [])
    return (
        <div className="datatable">
            <div className="title">
                <h1>Movies List</h1>
                <div className="btn btn-primary text-decoration-none text-white">
                    <Link to='/admin/dashboard/upload' className='add-new-btn text-white'>Add New</Link>
                </div>
            </div>
            <DataGrid
                className='data-grid'
                rows={moviesRow}
                columns={userColumn}
                getRowHeight={() => 170}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                    },
                }}
            />
        </div>
    )
}

export default MoviesList
