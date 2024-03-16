import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { categories } from "../../Pages/Rooms/categoryes";
import { toast } from "react-hot-toast";

export default function UpdateModal({ setOpen, open, roomId,refetch }) {
  const [scroll, setScroll] = React.useState("paper");
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { data: room = [], isPending } = useQuery({
    queryKey: ["update-room", user],
    queryFn: () => axios.get(`/rooms/${roomId}`).then((res) => res.data),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handelUpdate = async (event) => {
    event.preventDefault()
    const from = event.target;
    const title = from.title.value;
    const category = from.category.value;
    const price = parseFloat(from.price.value);
    const bedrooms = parseFloat(from.bedrooms.value);
    const bathrooms = parseFloat(from.bathrooms.value);
    const guest = parseFloat(from.total_guest.value);
    const description = from.description.value;
    const body = {title,category,price,bathrooms,bedrooms,guest,description}
    axios.put(`/rooms/${roomId}`,body)
    .then(res=>{
      if(res?.data?.modifiedCount > 0){
        refetch()
        toast.success('Room information update sucessfuly')
        setOpen(false)
      }
    })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <DialogTitle sx={{ fontWeight: 700 }} id="scroll-dialog-title">
            Upodate Room
          </DialogTitle>
          <Button sx={{ mr: 3 }} onClick={handleClose}>
            <ImCross />
          </Button>
        </Box>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ maxWidth: 500 }}
          >
            <form onSubmit={handelUpdate} className="space-y-3">
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Location
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  type="text"
                  readOnly
                  defaultValue={room?.location}
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Title
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                  name="title"
                  type="text"
                  defaultValue={room?.title}
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600">
                  Category
                </label>
                <select
                  required
                  defaultValue={room?.category}
                  className="w-full px-4 py-3 border border-gray-500 focus:outline-rose-800 rounded-md"
                  name="category"
                >
                  {categories.map((category) => (
                    <option value={category.label} key={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between gap-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="price" className="block text-gray-600">
                    Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                    name="price"
                    type="number"
                    defaultValue={room?.price}
                    required
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="guest" className="block text-gray-600">
                    Total guest
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                    name="total_guest"
                    type="number"
                    p
                    defaultValue={room?.guests}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="bedrooms" className="block text-gray-600">
                    Bedrooms
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                    name="bedrooms"
                    type="number"
                    defaultValue={room?.bedrooms}
                    required
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="bathrooms" className="block text-gray-600">
                    Bathrooms
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-gray-500 focus:outline-rose-800 rounded-md "
                    name="bathrooms"
                    type="number"
                    defaultValue={room?.bathrooms}
                    required
                  />
                </div>
              </div>
              <div>
                <img
                  className="w-full object-cover h-[195px] rounded-md"
                  src={room?.image}
                  alt={room?.title}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>

                <textarea
                  id="description"
                  defaultValue={room?.description}
                  className="block rounded-md focus:rose-300 w-full h-44 px-4 py-3 text-gray-800  border border-gray-500 focus:outline-rose-800 "
                  name="description"
                ></textarea>
              </div>
            <button type="submit" className="text-white bg-rose-600 w-full font-medium py-2 rounded-md mr-3">Update</button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
