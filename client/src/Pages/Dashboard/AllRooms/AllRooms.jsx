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
import { TbTrash } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { Box, Chip } from "@mui/material";
import { useState } from "react";
import UpdateModal from "../../../Component/Dashboard/UpdateModal";
import DeleteModal from "../../../Component/Dashboard/DeleteModal";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

export default function AllRooms() {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletetedId, setDeletedId] = useState("");
  const [roomId, setRoomId] = useState("");
  const axios = useAxiosPublic();
  const { data: allRooms = [], refetch } = useQuery({
    queryKey: ["all-rooms"],
    queryFn: () => axios.get(`/dashboard/rooms`).then((res) => res.data),
  });

  const handeleditModal = (id) => {
    setOpen(true);
    setRoomId(id);
  };

  const handelDeleteModal = (id) => {
    setDeleteModal(true);
    setDeletedId(id);
  };

  const handelRoom = (status, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure to ${status} this room! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/rooms/${id}`, { status: status }).then((response) => {
          refetch();
          if (response.data.modifiedCount > 0) {
            toast.success(`Room is updated to ${status} Now!`);
          }
        });
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Manager</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRooms.map((room) => (
            <TableRow
              key={room?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {room?.location}
              </TableCell>
              <TableCell align="center">
                <img
                  className="w-14 h-14 object-cover"
                  src={room?.image}
                  alt=""
                />
              </TableCell>
              <TableCell align="center">{room.host?.email}</TableCell>
              <TableCell align="center">
                {room?.status === "active" ? (
                  <button onClick={() => handelRoom("deactive", room?._id)}>
                    <Chip label={room?.status} sx={{ bgcolor: "#EAB308 " }} />
                  </button>
                ) : (
                  <button onClick={() => handelRoom("active", room?._id)}>
                    <Chip label={room?.status} sx={{ bgcolor: "#DC2626" }} />
                  </button>
                )}
              </TableCell>
              <TableCell align="center">{room?.category}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <TbTrash
                    onClick={() => handelDeleteModal(room?._id)}
                    className="cursor-pointer text-3xl px-2 bg-red-600 text-white  rounded"
                  />
                  <FaEdit
                    onClick={() => handeleditModal(room?._id)}
                    className="cursor-pointer text-3xl bg-green-600 px-2 text-white  rounded"
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && <UpdateModal refetch={refetch} roomId={roomId} setOpen={setOpen} open={open} />}
      {deleteModal && (
        <DeleteModal
          refetch={refetch}
          deletetedId={deletetedId}
          setDeleteModal={setDeleteModal}
        />
      )}
    </TableContainer>
  );
}
