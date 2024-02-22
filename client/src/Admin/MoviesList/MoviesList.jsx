import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userColumn } from '../assets/moviesTable';
import '../assets/coreDataTable.scss';
import { Link, useNavigate } from 'react-router-dom';

const MoviesList = () => {
    const [moviesRow, setMoviesRow] = useState([]);
    const history = useNavigate()
    // SingleViewMovies

    const handleViewClick = (event, movieId) => {
        event.preventDefault();
        // Navigate to the user details page with the user ID
        history(`/admin/dashboard/movies-list/edit/${movieId}`);
    };



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

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 100, sortable: false, renderCell: (params) => {
                return (
                    <div className="cellWithAction">
                        <div className="view-btn" onClick={(event) => handleViewClick(event, params.row.movie_id)}>
                            Edit
                        </div>
                        {/* <div className={params.row.status === 'disable' ? 'enable-btn' : 'disable-btn'} onClick={(event) => { event.stopPropagation(); updateUserStatus(params.row.user_id, params.row.status === 'disable' ? 'enable' : 'disable'); }}>
                            {params.row.status === 'disable' ? 'Enable' : 'Disable'}
                        </div> */}

                    </div>
                )
            }
        }
    ]

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
                columns={userColumn.concat(actionColumn)}
                getRowHeight={() => 170}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 3 },
                    },
                }}
                pageSizeOptions={[3]}
            />
        </div>
    )
}

export default MoviesList
