import React, { useEffect, useState } from 'react';
// import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumn } from '../assets/data'
// const userId = localStorage.getItem('user_id');
// import './AdminUsers.scss'
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [userRows, setUserRows] = useState([]);
    // const [isDisabled, setIsDisabled] = useState(false);
    const history = useNavigate();

    const handleViewClick = (event, userId) => {
        event.preventDefault();
        // Navigate to the user details page with the user ID
        history(`/admin/dashboard/users/view/${userId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await fetch(`http://localhost:5000/adminData/userDetails`);
                const data = await responce.json();

                const rowsWithId = data.adminViewUser.map((row, index) => ({ ...row, id: index + 1 }));

                setUserRows(rowsWithId);
                console.log('Data: ', rowsWithId)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
    }, [])

    const updateUserStatus = async (userId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/adminData/updateStatus/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.message === 'Status Updated Successfully') {
                const updatedUserRows = userRows.map(row => {
                    if (row.user_id === userId) {
                        return { ...row, status: status };
                    }
                    return row;
                });
                setUserRows(updatedUserRows);

            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }


    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 150, sortable: false, renderCell: (params) => {
                return (
                    <div className="cellWithAction">
                        <div className="view-btn" onClick={(event) => handleViewClick(event, params.row.user_id)}>
                            View
                        </div>
                        <div className={params.row.status === 'disable' ? 'enable-btn' : 'disable-btn'} onClick={(event) => { event.stopPropagation(); updateUserStatus(params.row.user_id, params.row.status === 'disable' ? 'enable' : 'disable'); }}>
                            {params.row.status === 'disable' ? 'Enable' : 'Disable'}
                        </div>

                    </div>
                )
            }
        }
    ]

    return (
        <>
            <div className="datatable">
                <div className="title">
                    <h1>User Data</h1>
                    {/* <div className="add-new">
                        <Link to='/dashboard/users/new' className='add-new-btn'>Add New</Link>
                    </div> */}
                </div>
                <DataGrid
                    className='data-grid'
                    rows={userRows}
                    columns={userColumn.concat(actionColumn)}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 15]}
                // checkboxSelection
                />
            </div>
        </>
    );
};

export default AdminUsers;