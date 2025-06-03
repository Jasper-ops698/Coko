import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, CardMedia } from "@mui/material";

const ProductDetails = ({ products }) => {
    const { id } = useParams();
    const product = products.find((p) => p._id === id);

    if (!product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    return (
        <Box p={3}>
            <Typography variant="h4">{product.name}</Typography>
            <CardMedia
                component="img"
                height="300"
                image={product.imageUrl}
                alt={product.name}
            />
            <Typography variant="body1" paragraph>
                Category: {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
                Type: {product.type}
            </Typography>
            <Typography variant="body1" paragraph>
                Price: Ksh{product.price}
            </Typography>
            <Typography variant="body1" paragraph>
                Serial Number: {product.serialNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
                Description: {product.description || "No description available."}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                Add to Cart
            </Button>
            <Button variant="outlined" color="secondary">
                Go Back
            </Button>
        </Box>
    );
};

export default ProductDetails;