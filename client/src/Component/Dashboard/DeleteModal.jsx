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
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function DeleteModal({
  setDeleteModal,
  deletetedId,
  refetch
}) {
  const theme = useTheme();
  const axios = useAxiosPublic();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setDeleteModal(false);
  };

  const { data: room = [], isPending } = useQuery({
    queryKey: ["room-delete", deletetedId],
    queryFn: () => axios.get(`/rooms/${deletetedId}`).then((res) => res.data),
  });

  const handelDelete = (id) => {
    axios.delete(`/rooms/${id}`)
    .then(res=>{
      console.log(res.data);
        if(res.data.deletedCount > 0){
            refetch()
            toast.success('Your Room is Delete sucessfully')
            setDeleteModal(false)
        }
    })
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{ fontWeight: 600, pr: 15 }}
          id="responsive-dialog-title"
        >
          {"Are you sure to delete this room?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Title :{room?.title}</Typography>
            <Typography>Location :{room?.location}</Typography>
            <Typography>Price :{room?.price}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">
            Cancel
          </Button>
          <Button
            onClick={() => handelDelete(room?._id)}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
