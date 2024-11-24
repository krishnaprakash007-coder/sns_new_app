import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { CartContext } from "../context/CartContext.jsx";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

// Dynamically import all images from the assets folder
const images = import.meta.glob("../../assets/images/*", { eager: true });

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Product not found
      </Typography>
    );
  }

  // Dynamically resolve the image path
  const imagePath = `../../assets/images/${product.image}`;
  const productImage = images[imagePath]?.default || "";

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="400"
              image={productImage}
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              Price: ${product.sellingPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              <strong>Available Quantity:</strong> {product.quantity}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
