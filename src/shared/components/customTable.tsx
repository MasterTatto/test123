import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    protein1: number,
    protein2: number,
    protein3: number,
    protein4: number,
) {
    return {name, calories, fat, carbs, protein, protein1, protein2, protein3, protein4};
}

const rows = [
    createData('2020', 159, 6.0, -24, 4.0, 159, 6.0, 24, 4.0),
    createData('2021', -237, 9.0, -37, 4.3, 159, 6.0, 24, 4.0),
    createData('2022', 262, 16.0, 24, 6.0, 159, 6.0, 24, 4.0),
];

interface T {
    children?: any
}

const CustomTable: FC<T> = ({children}) => {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Год</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                        <TableCell align="right">Янв</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className="red" align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
         </TableContainer>
        // <StyledTableContainer >
        //     <Table sx={{minWidth: 650}} aria-label="a dense table">
        //         <TableHead>
        //             <StyledTableRow>
        //                 <StyledTableCell align="center">Год</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //                 <StyledTableCell align="center">Янв</StyledTableCell>
        //             </StyledTableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows.map((row) => (
        //                 <StyledTableRow key={row.name}>
        //                     <StyledTableCell component="th" scope="row">
        //                         {row.name}
        //                     </StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.calories}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'} scope="row"
        //                                      align="center">{row.fat}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.carbs}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.protein}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.protein1}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.protein2}</StyledTableCell>
        //                     <StyledTableCell className={row.calories < 0 ? 'red' : 'green'}
        //                                      align="center">{row.protein3}</StyledTableCell>
        //                 </StyledTableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </StyledTableContainer>
    );
};

export default CustomTable;