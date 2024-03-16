import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import SearchCountryes from './SearchCountryes';
import { useState } from 'react';
import CounytryMap from './CounytryMap';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const PlaceModal = ({setIsPlaceOpen,setIsCalenderOpen,setLocation,setIsSelectionOpen}) => {
  const [countryName,setCountryName] = useState(null);
  
  const handleChange = selectedOption => {
    setCountryName(selectedOption);
    setLocation(selectedOption.label);
  };
  
  const handleClose = () => {
    // setIsCalenderOpen(true);
    setIsSelectionOpen(true)
    setIsPlaceOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={()=>setIsPlaceOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ ml: 'calc(100% - 60%)', p: 2,fontSize:24,fontWeight:700 }} id="customized-dialog-title">
          Filters
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setIsPlaceOpen(false)}
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
              Where do you wanna go?
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#010101", mb: 1 }}>
              Find your perfect location!
            </Typography>
          </Box>
          <SearchCountryes handleChange={handleChange} />
          <div className='mt-3'>
            <CounytryMap longlet={countryName?.latlng || null} />
          </div>
        </DialogContent>
        <button className='bg-rose-500 py-3 rounded-md mx-5 mt-4 mb-4 text-white' onClick={handleClose}>Next</button>
      </BootstrapDialog>
    </>
  );
}

export default PlaceModal;
