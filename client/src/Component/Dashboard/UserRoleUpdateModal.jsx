import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function UserRoleUpdateModal({ modalOpen, setModalOpen, user,refetch }) {
  const [role, setRole] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const axios = useAxiosPublic()

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setRole("");
  };

  const handelUpdate = () => {
    if(role === ''){
        toast.error('Please first select the role')
    }else{
        axios.put(`/users/${user?._id}`,{role:role})
        .then((res)=>{
            setModalOpen(false)
            toast.success('User Role updated sucessfuly')
            refetch()
        })
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{ fontWeight: 700, pr: 10 }}
          id="responsive-dialog-title"
        >
          {"Are you sure to update this user role?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Name : {user?.name}</Typography>
            <Typography>Email : {user?.email}</Typography>
            <div className="flex gap-1 items-center mt-2">
              <label htmlFor="">Role : </label>
              <select
                required
                className="px-3 py-2 border border-gray-500"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                defaultValue={user?.role}
                id=""
              >
                <option value="admin">admin</option>
                <option disabled={user?.role === "creator"} value="creator">
                  creator
                </option>
                <option disabled value="user">
                  user
                </option>
              </select>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handelUpdate}
            className="text-white bg-green-600 px-4 py-1.5 rounded-md"
          >
            Update
          </button>
          <button
            onClick={handleClose}
            className="text-white bg-indigo-600 px-4 py-1.5 rounded-md"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
