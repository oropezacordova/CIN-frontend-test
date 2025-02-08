import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

const ProductAddDialog = ({ open, handleClose, handleSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleFormSubmit = async () => {
    await handleSubmit({ name, price });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label='Name'
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant='outlined'
          />
          <TextField
            label='Price'
            name='price'
            type='number'
            value={price}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0 || e.target.value === '') {
                setPrice(e.target.value);
              }
            }}
            fullWidth
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleFormSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductAddDialog;
