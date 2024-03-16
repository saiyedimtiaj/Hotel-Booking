import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const CalenderModel = ({setIsCalenderOpen,setIsSelectionOpen,setIsPlaceOpen,setState,state}) => {
  
  const handleClose = () => {
    setIsSelectionOpen(true)
    setIsCalenderOpen(false);
  };

  const handleBack = () => {
    setIsPlaceOpen(true)
    setIsCalenderOpen(false)
  }

  return (
    <>
      <BootstrapDialog
        onClose={()=>(setIsCalenderOpen(false))}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ ml: 'calc(100% - 60%)', px: 2,fontSize:24,fontWeight:700 }} id="customized-dialog-title">
          Filter
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>(setIsCalenderOpen(false))}
          sx={{
            position: 'absolute',
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
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
              When do you plan to go?
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#010101" }}>
              Make sure everyone is free!
            </Typography>
          </Box>
          <DateRange
          onChange={(item) => setState([item.selection])}
          ranges={state}
          date={new Date()}
          minDate={new Date()}
          rangeColors={["#262626"]}
          showDateDisplay={false}
          direction="vertical"
          dateDisplayFormat='MMM d, yyyy'
          showMonthAndYearPickers={true}
        />
        </DialogContent>
        <div className="flex gap-3 items-center">
          <button
          onClick={handleBack}
            className="border-2 border-black font-medium py-[10px] w-full ml-3 mb-1 rounded-md text-black"
          >
            Back
          </button>
          <button
            className="bg-rose-500 font-medium py-3 w-full mr-3 rounded-md mb-1 text-white"
            onClick={handleClose}
          >
            Next
          </button>
        </div>
      </BootstrapDialog>
    </>
  );
}

export default CalenderModel;