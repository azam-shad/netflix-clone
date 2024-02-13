import React from 'react';
import './coreDataTable.scss';
import { DataGrid } from '@mui/x-data-grid';

const TablesCom = ({ rows, columns, isCheckboxSelection }) => {
    return (
        <>
            <div className="core-data-grid">
                <DataGrid
                    className="data-grid"
                    rows={rows}
                    columns={columns}
                    checkboxSelection={isCheckboxSelection}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 15]}
                    rowHeight={45}
                    sx={{
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar':
                        {
                            height: '4px',
                            borderRadius: '20px',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track':
                        {
                            background: '#f1f1f1',

                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb':
                        {
                            backgroundColor: '#888',
                            borderRadius: '20px',
                        },
                    }}
                />
            </div>
        </>
    );
};

export default TablesCom;






















// export default function TablesCom({ firstName, lastName, roles }) {
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>{'First Name'}</TableCell>
//                         <TableCell align="right">{'Last Name'}</TableCell>
//                         <TableCell align="right">{'Role'}</TableCell>
//                         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                         <TableCell component="th" scope="row">
//                             {firstName}
//                         </TableCell>
//                         <TableCell component="th" scope="row">
//                             {lastName}
//                         </TableCell>
//                         <TableCell component="th" scope="row">
//                             {roles}
//                         </TableCell>
//                     </TableRow>
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
