
//temporary Data
// import user_image from '../images/userDefault.jpg';

export const userColumn = [
    // { field: 'user_id', headerName: 'ID', width: 50, hide: true },
    { field: 'id', headerName: 'Serial Number', width: 150, sortable: false },
    // { field: 'firstname', headerName: 'First name', width: 130 },
    // { field: 'lastname', headerName: 'Last name', width: 130 },
    {
        field: 'username',
        headerName: 'Full Name',
        width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {/* <img
                        className="user-avatar"
                        src={params.row.img}
                        alt="userImage"
                    /> */}
                    {params.row.firstname} {params.row.lastname}
                </div>
            );
        },
    },
    { field: 'firstname', headerName: 'First name', width: 130 },
    { field: 'lastname', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email ID', width: 200 },
    {
        field: 'phonenumber', headerName: 'Phone number', width: 150, sortable: false, renderCell: (params) => {
            return (
                <div>{params.row.countrycode} {params.row.phonenumber}</div>
            );
        }
    },
    {
        field: 'role_name',
        headerName: 'Role',
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithRole ${params.row.role_name}`}>
                    {params.row.role_name}
                </div>
            );
        },
    },
    // { field: 'createdOn', headerName: 'Created On', width: 130 },
];