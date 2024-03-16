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
import { Box, Chip } from "@mui/material";
import UserRoleUpdateModal from "../../../Component/Dashboard/UserRoleUpdateModal";

export default function AllUser() {
  const [modalOpen,setModalOpen] = React.useState(false)
  const [userInfo,setUser] = React.useState([])
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { data: alluser = [], refetch } = useQuery({
    queryKey: ["All-Users", user],
    queryFn: () => axios.get(`/users`).then((res) => res.data),
  });

  const handelOpen = (user) => {
    setModalOpen(true)
    setUser(user)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alluser.map((room) => (
            <TableRow
              key={room?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {room?._id}
              </TableCell>
              <TableCell align="center">
                <img
                  className="w-12 rounded-full h-12 object-cover"
                  src={room?.image}
                  alt=""
                />
              </TableCell>
              <TableCell align="center">{room?.name}</TableCell>
              <TableCell align="center">{room.email}</TableCell>
              <TableCell align="center">
                {room?.role === "admin" ? (
                  <Chip label={room?.role} color="primary" />
                ) : (
                  <button onClick={()=>handelOpen(room)}>
                    {" "}
                    <Chip label={room?.role} color="error" />
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {modalOpen && <UserRoleUpdateModal refetch={refetch} user={userInfo} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </TableContainer>
  );
}
