
//temporary Data
// import user_image from '../images/userDefault.jpg';

export const userColumn = [
    { field: 'id', headerName: 'Serial Number', width: 200, sortable: false },
    {field: 'title', headerName: 'Title', width: 200, },
    {
        field: 'poster_url', headerName: 'Poster', width: 200, renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="user-avatar"
                        src={`http://localhost:5000/uploadsImageandVideo/${params.row.poster_url}`}
                        alt={params.row.poster_url}
                    />
                </div>
            );
        },
    },
    { field: 'director', headerName: 'Director Name', width: 200 },
    { field: 'release_date', headerName: 'Release Date', width: 200 },
    { field: 'duration', headerName: 'Length', width: 200 },

];




// {
//     field: 'phonenumber', headerName: 'Phone number', width: 150, sortable: false, renderCell: (params) => {
//         return (
//             <div>{params.row.countrycode} {params.row.phonenumber}</div>
//         );
//     }
// },
// {
//     field: 'role_name',
//     headerName: 'Role',
//     width: 100,
//     renderCell: (params) => {
//         return (
//             <div className={`cellWithRole ${params.row.role_name}`}>
//                 {params.row.role_name}
//             </div>
//         );
//     },
// },
// { field: 'createdOn', headerName: 'Created On', width: 130 },