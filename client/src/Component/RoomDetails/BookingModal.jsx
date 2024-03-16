import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import moment from "moment";
import useAuth from "../../Hooks/useAuth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const stripePromise = loadStripe(
  "pk_test_51OECa6JppFDY8B5jfeGOAt0HVDsH1z8BZu6NSWOsW99PJxw0EOfetFMN9MvhEsirRD6UHDNyKqotJ7V5bHqbmBc300bsjMYMxS"
);

const BookingModal = ({
  open,
  image,
  setOpen,
  location,
  title,
  startDate,
  endDate,
  totalPrice,
  id,
  host,
  refetch
}) => {
    const {user} = useAuth()
  const handleClose = () => {
    setOpen(false);
  };

  const bookingInfo = {
    roomId : id,
    location,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    totalPrice,
    bookingDate: moment().format('ll'),
    userName:user?.displayName,
    userEmail:user?.email,
    userProfile:user?.photoURL,
    roomImage:image,
    host
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
          Review Info Before Reserve
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography>Room: {title}</Typography>
            <Typography>Location: {location}</Typography>
            <Typography  sx={{maxWidth:700}}>
              From: {startDate.slice(0, 15)} - To: {endDate.slice(0, 15)}
            </Typography>
            <Typography>Price: {totalPrice}</Typography>
          </DialogContentText>
          <Elements stripe={stripePromise}>
            <Payment bookingInfo={bookingInfo} setOpen={setOpen} refetch={refetch} totalPrice={totalPrice} />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;
