import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';

const TripsModal = ({open,setOpen,tripData,refetch}) => {
    const axios = useAxiosPublic()
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`/bookings/${id}`)
    .then(res=>{
        if(res.data.deletedCount > 0){
            refetch()
            toast.success('Your reservation cancel sucessfully')
            setOpen(false)
        }
    })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{fontWeight:700}}>
          Are you sure to cancel your reservation?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Location: {tripData?.location}</Typography>
            <Typography>From: {tripData?.startDate?.slice(0,15)} - To: {tripData?.endDate?.slice(0,15)}</Typography>
            <Typography>Price: {tripData?.totalPrice} </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button onClick={()=>handleDelete(tripData?._id)} className="bg-blue-600 text-white px-5 py-1.5 rounded">
          Confirm
        </button>
        <button onClick={()=>setOpen(false)} className="bg-rose-300 text-black px-5 rounded py-1.5">
            Cancel
        </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TripsModal;