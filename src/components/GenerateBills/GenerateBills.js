import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
function createData(name, roomsbooked, advancedpaid) {
  return { name, roomsbooked, advancedpaid };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

export default function GenerateBills() {
   
        return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: 'bold',fontSize:'25px'}}>Guest name</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'25px'}}>Rooms booked</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'25px'}}>Advanced Paid</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold',fontSize:'25px'}}>Generate Bill</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.roomsbooked}</TableCell>
                      <TableCell align="right">{row.advancedpaid}</TableCell>
                      <TableCell align="right"><Button variant="contained">Checkout</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
}

