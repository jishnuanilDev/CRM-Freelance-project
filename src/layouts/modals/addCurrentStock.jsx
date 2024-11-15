import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Input} from "@nextui-org/react";
import Modal from '@mui/material/Modal';
import { Iconify } from 'src/components/iconify';
import axiosInstance from 'src/configs/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import '../../global.css'
import { TextField, Container,MenuItem, Grid, Paper } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CurrentStockForm({setUpdate,purchaseOrderData}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
     productName: '', 
     quantity: '', 
     price: '', 
     supplier: '', 
     dateRecieved: '', 
     expiryDate: '', 
    });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName) newErrors.productName = 'Product Name is required';
    if (!formData.quantity) newErrors.quantity = 'quantity is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    if (!formData.dateRecieved) newErrors.dateRecieved = 'Date Recieved is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
   
    if (!validateForm()) {
       return;
      }
try{
    const result = await axiosInstance.post('/newCurrentStock',formData);
    if(result){
        toast.success(result.data.message);
        handleClose();
        setFormData({
            productName: '', 
            quantity: '', 
            price: '', 
            supplier: '', 
            dateRecieved: '', 
            expiryDate:''
           })
           setUpdate(prev=>!prev);
    }
   

}catch(err){
    toast.success(err.response.data.message);
    console.error('Error occured in adding Current stock in client side',err.message);
}
    
   
  };
  return (
    <div>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <Button
            onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
         New Current Stock
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}

<Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 5, backgroundColor: '#f9f9f9', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography component="h1" variant="h5" fontWeight="bold" color="primary" gutterBottom>
           Add New current Stock
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Current Stock Management
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                    fullWidth
                    select
                    label='Product Name'
                    name='productName'
                    value={formData.productName}
                    onChange={handleChange}
                    error={!!errors.productName}
                    helperText={errors.productName}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  >
                    {purchaseOrderData.map((purchaseOrderData, index) => (
                      <MenuItem key={index} value= {purchaseOrderData.productName}>
                   {purchaseOrderData.productName}
                      </MenuItem>
                    ))}

                    {/* This item only triggers navigation, not a form selection */}
                    <MenuItem
                      onClick={() => navigate('/purchase-order-creation')}
                      sx={{ fontStyle: 'italic' }} // Optional styling
                    >
                      Add New Product +
                    </MenuItem>
                  </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                error={!!errors.supplier}
                helperText={errors.supplier}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date Recieved"
                name="dateRecieved"
                type='date'
                value={formData.dateRecieved}
                onChange={handleChange}
                error={!!errors.dateRecieved}
                helperText={errors.dateRecieved}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
                InputLabelProps={{
                    shrink: true, // Keeps the label above the field to avoid overlap
                  }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry"
                name="expiryDate"
                type='date'
                value={formData.expiryDate}
                onChange={handleChange}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
                InputLabelProps={{
                    shrink: true, // Keeps the label above the field to avoid overlap
                  }}
              />
            </Grid>
          </Grid>
          <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 4,
    py: 1.5,
    fontWeight: 'bold',
    borderRadius: 8,
    background: 'linear-gradient(90deg, #4a90e2, #3b5998)',
    color: 'white',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(90deg, #3b5998, #4a90e2)',
    },
  }}
>
 Submit
</Button>

        </Box>
      </Paper>
    </Container>
      </Modal>
    </div>
  );
}
