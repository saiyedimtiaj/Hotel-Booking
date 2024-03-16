import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Rating } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

export default function ReviewModal({ setModal,refetchReview, modal, id, review }) {
  const theme = useTheme();
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setModal(false);
  };

  const handelAddReview = (event) => {
    event.preventDefault();
    const body = {
      roomId: id,
      userName: user?.displayName,
      userProfile: user?.photoURL,
      email: user?.email,
      retting: parseInt(event.target.simple_controlled.value),
      review: event.target.review.value,
    };

    const reviewFilter = review.filter((review) => review.roomId === id);
    const emailFilter = review.filter((review) => review.email === user?.email);

      axios.post("/review", body).then((res) => {
        console.log(res.data);
        if (res.data?.insertedId) {
          setModal(false);
          toast.success("Thank you for your valuable review");
          refetchReview()
        }
      });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={modal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ fontWeight: 600 }} id="responsive-dialog-title">
          {"Add a Review !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handelAddReview} className="flex flex-col gap-y-3">
              <Rating aria-required name="simple_controlled" />
              <textarea
                placeholder="Add your Review"
                className="border-2 border-black text-black p-2"
                name="review"
                id=""
                cols="46"
                rows="5"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 flex py-1.5 text-white bg-blue-600 font-semibold mr-3 mb-2"
                >
                  Add Review
                </button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
