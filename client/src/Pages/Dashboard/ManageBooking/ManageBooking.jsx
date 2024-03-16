import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ManageBookings() {
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { data: bookings = [], isPending } = useQuery({
    queryKey: ["manage-creator-bookings", user],
    queryFn: () =>
      axios
        .get(`/dashboard/bookings?email=${user?.email}`)
        .then((res) => res.data),
  });

  console.log(bookings);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>User Profile</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">Booking Start</TableCell>
            <TableCell align="right">Booking End</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings?.map((book) => (
            <TableRow
              key={book?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book?._id}
              </TableCell>
              <TableCell align="right">
                <img className='w-12 h-12 object-cover rounded-full' src={book?.userProfile} alt="" />
              </TableCell>
              <TableCell align="right">{book?.userEmail}</TableCell>
              <TableCell align="right">{book?.startDate.slice(0,15)}</TableCell>
              <TableCell align="right">{book?.endDate.slice(0,15)}</TableCell>
              <TableCell align="right">$ {book?.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}