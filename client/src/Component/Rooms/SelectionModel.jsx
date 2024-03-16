import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SelectionModel = ({
  setIsPlaceOpen,
  setIsSelectionOpen,
  refetch,
  setIsCalenderOpen,
  bathrooms,
  setBathrooms,
  setRooms,
  rooms,
  gusets,
  setGusets,
}) => {
  const handleClose = () => {
    setIsSelectionOpen(false);
    refetch()
  };

  const handleBack = () => {
    // setIsCalenderOpen(true);
    setIsPlaceOpen(true)
    setIsSelectionOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={() => setIsSelectionOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ ml: "calc(100% - 60%)", p: 2, fontSize: 24, fontWeight: 700 }}
          id="customized-dialog-title"
        >
          Filters
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsSelectionOpen(false)}
          sx={{
            position: "absolute",
            left: 10,
            top: 18,
            color: (theme) => theme.palette.grey[800],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <DialogContent>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
              More Information
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#010101", mb: 2 }}>
              Find your perfect Place
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              gap: 10,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 19, fontWeight: 700 }}>
                Guests
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                How many gusets are comming?
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <button onClick={()=>setGusets(gusets + 1)} className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-2">
                +
              </button>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{gusets}</Typography>
              <button onClick={()=>setGusets(gusets - 1)} disabled={gusets === 0}  className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-[10px]">
                -
              </button>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 2,
              gap: 10,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 19, fontWeight: 700 }}>
                Rooms
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                How many rooms do you need?
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <button onClick={()=>setRooms(rooms + 1)} className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-2">
                +
              </button>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{rooms}</Typography>
              <button onClick={()=>setRooms(rooms - 1)} disabled={rooms === 0} className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-[10px]">
                -
              </button>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 2,
              gap: 10,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 19, fontWeight: 700 }}>
                Bathrooms
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                How many bathrooms do you need?
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <button
                onClick={() => setBathrooms(bathrooms + 1)}
                className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-2"
              >
                +
              </button>
              <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                {bathrooms}
              </Typography>
              <button
                disabled={bathrooms === 0}
                onClick={() => setBathrooms(bathrooms - 1)}
                className="border-2 border-gray-400 text-gray-400 rounded-full text-center pb-[2px] px-[10px]"
              >
                -
              </button>
            </Box>
          </Box>
        </DialogContent>
        <div className="flex gap-3 items-center">
          <button
            onClick={handleBack}
            className="border-2 border-black font-medium py-[10px] w-full ml-3 rounded-md mb-4 text-black"
          >
            Back
          </button>
          <button
            className="bg-rose-500 font-medium py-3 w-full mr-3 rounded-md mb-4 text-white"
            onClick={handleClose}
          >
            Search
          </button>
        </div>
      </BootstrapDialog>
    </>
  );
};

export default SelectionModel;
