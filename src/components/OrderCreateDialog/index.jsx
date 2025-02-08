import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductAddDialog from '../ProductAddDialog';

const OrderCreateDialog = ({ open, handleClose, handleSubmit, selectedOrder = null }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(selectedOrder?.productId || '');
  const [units, setUnits] = useState(selectedOrder?.units || '');
  const [bonus, setBonus] = useState(selectedOrder?.bonus || '');
  const [promo, setPromo] = useState(selectedOrder?.promo || '');
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [totalPrice, setTotalPrice] = useState(selectedOrder?.totalPrice || '');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    formula();
  }, [productId, units, bonus, promo]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);

  const handleSubmitAddProduct = async (product) => {
    await fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    fetchData();
  };

  const handleFormSubmit = async () => {
    if (selectedOrder) {
      await handleSubmit({ ...selectedOrder, productId, units, bonus, promo });
    } else {
      await handleSubmit({ productId, units, bonus, promo });
    }
    handleClose();
  };

  const formula = () => {
    if (selectedOrder) {
      if (productId) {
        findProduct();
      } else {
        setTotalPrice(
          selectedOrder.product.price *
            ((parseFloat(units) || 0) + (parseFloat(bonus) || 0) + (parseFloat(promo) || 0)),
        );
      }
    } else {
      findProduct();
    }
  };

  const findProduct = () => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      const res = product.price * ((parseFloat(units) || 0) + (parseFloat(bonus) || 0) + (parseFloat(promo) || 0));
      setTotalPrice(res);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent style={{ padding: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel>Product</InputLabel>
            <Select label='Product' name='productId' value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant='contained' color='primary' size='small' onClick={handleOpenAddProduct}>
            Add New Product
          </Button>
          <ProductAddDialog
            open={openAddProduct}
            handleClose={handleCloseAddProduct}
            fetchProducts={fetchData}
            handleSubmit={handleSubmitAddProduct}
          />
          <TextField
            label='Units'
            name='units'
            type='number'
            value={units}
            onChange={(e) => {
              if (e.target.value >= 0 || e.target.value === '') {
                setUnits(e.target.value);
              }
            }}
            fullWidth
            variant='outlined'
          />
          <TextField
            label='Bonus'
            name='bonus'
            type='number'
            value={bonus}
            onChange={(e) => {
              if (e.target.value >= 0 || e.target.value === '') {
                setBonus(e.target.value);
              }
            }}
            fullWidth
            variant='outlined'
          />
          <TextField
            label='Promo'
            name='promo'
            type='number'
            value={promo}
            onChange={(e) => {
              if (e.target.value >= 0 || e.target.value === '') {
                setPromo(e.target.value);
              }
            }}
            fullWidth
            variant='outlined'
          />
          <TextField
            label='Total Price'
            name='totalPrice'
            type='number'
            disabled
            value={totalPrice}
            fullWidth
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCreateDialog;
