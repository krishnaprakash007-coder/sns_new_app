import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Divider,
} from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.sellingPrice, 0);

  if (cart.length === 0) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Your cart is empty.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <List>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={item.image || "/assets/images/default-product.png"}
                  alt={item.name}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.sellingPrice}`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6" color="primary">
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
          >
            Proceed to Checkout
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Cart;
