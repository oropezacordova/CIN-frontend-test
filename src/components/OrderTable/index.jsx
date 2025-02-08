import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const OrderTable = ({ data, handleSelectOrder }) => {
  return (
    <Box sx={{ width: '80%', maxWidth: '1200px' }}>
      <Typography variant='h4' align='center' gutterBottom>
        Pedidos
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Units</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Bonus</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Promo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{`${item.product.id} - ${item.product.name}`}</TableCell>
                <TableCell>{item.units}</TableCell>
                <TableCell>{item.bonus}</TableCell>
                <TableCell>{item.promo}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleSelectOrder(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
