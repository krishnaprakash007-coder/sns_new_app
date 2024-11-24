import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // In a real application, place the order here
    alert("Order placed successfully!");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Your cart is empty. Please add items to your cart before proceeding.
      </Typography>
    );
  }

  const totalAmount = cart.reduce((total, item) => total + item.sellingPrice, 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Order Summary</Typography>
        <List>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: $${item.sellingPrice}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${totalAmount}</Typography>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={clearCart}
        >
          Clear Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
