import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { TbTrash } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { Box } from "@mui/material";
import { useState } from "react";
import UpdateModal from "../../../Component/Dashboard/UpdateModal";
import DeleteModal from "../../../Component/Dashboard/DeleteModal";


export default function MyListing() {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletetedId,setDeletedId] = useState('');
  const [roomId,setRoomId] = useState('')
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { data: allRooms = [], isPending,refetch } = useQuery({
    queryKey: ["My-Listing", user],
    queryFn: () =>
      axios
        .get(`/dashboard/rooms?email=${user?.email}`)
        .then((res) => res.data),
  });

  const handeleditModal = (id) =>{
    setOpen(true)
    setRoomId(id);
  }

  const handelDeleteModal = (id) => {
    setDeleteModal(true)
    setDeletedId(id)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room ID</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Per Night</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRooms.map((room) => (
            <TableRow
              key={room?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {room?._id}
              </TableCell>
              <TableCell align="center">
                <img
                  className="w-14 h-14 object-cover"
                  src={room?.image}
                  alt=""
                />
              </TableCell>
              <TableCell align="center">{room?.location}</TableCell>
              <TableCell align="center">$ {room.price}</TableCell>
              <TableCell align="center">{room?.category}</TableCell>
              <TableCell align="right">
                <Box sx={{display:'flex' ,gap: '5px'}} >
                  <TbTrash onClick={()=>handelDeleteModal(room?._id)} className="cursor-pointer text-3xl px-2 bg-red-600 text-white  rounded" />
                <FaEdit onClick={()=>handeleditModal(room?._id)} className="cursor-pointer text-3xl bg-green-600 px-2 text-white  rounded" />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && <UpdateModal roomId={roomId} setOpen={setOpen} open={open} />}
      {deleteModal && <DeleteModal refetch={refetch} deletetedId={deletetedId} setDeleteModal={setDeleteModal} />}
    </TableContainer>
  );
}
