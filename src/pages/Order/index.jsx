import React, { useEffect, useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import OrderTable from '../../components/OrderTable';
import OrderCreateDialog from '../../components/OrderCreateDialog';
import axios from 'axios';

const Order = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/orders');
    const data = await response.json();
    setOrders(data);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handleFormSubmit = async (order) => {
    try {
      const url = order.id !== undefined ? `http://localhost:8080/orders/${order.id}` : 'http://localhost:8080/orders';
      const method = order.id !== undefined ? 'PUT' : 'POST';
      const body = {
        productId: order.productId === '' ? order.product.id : order.productId,
        units: order.units,
        bonus: order.bonus,
        promo: order.promo,
      };
      await axios({
        method,
        url,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchData();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
      setOpenSnackbar(true);
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    handleOpen();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
      <OrderTable data={orders} handleSelectOrder={handleSelectOrder} />
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Create New Order
      </Button>
      {open && (
        <OrderCreateDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleFormSubmit}
          selectedOrder={selectedOrder}
        />
      )}
    </Box>
  );
};

export default Order;
