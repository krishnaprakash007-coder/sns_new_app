import React, { useState } from "react";
import products from "../data/products.json";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Link } from "react-router-dom";

// Dynamically load all images in the folder
const images = import.meta.glob("../../assets/images/*", { eager: true });

const ProductList = () => {
  const [view, setView] = useState("grid");

  const handleViewChange = (event, newView) => {
    if (newView) setView(newView);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="grid">Grid View</ToggleButton>
        <ToggleButton value="list">List View</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={3}>
        {products.map((product) => {
          const imagePath = `../../assets/images/${product.image}`;
          const imageSrc = images[imagePath]?.default || "";

          return (
            <Grid
              item
              xs={12}
              sm={view === "grid" ? 6 : 12}
              md={view === "grid" ? 4 : 12}
              key={product.id}
            >
              <Card sx={{ display: view === "list" ? "flex" : "block" }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="150"
                  image={imageSrc}
                  sx={{
                    width: view === "list" ? "150px" : "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    ${product.sellingPrice}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
