import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";

const CustomerPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Welcome to Jasper's Store!
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {product.category} - Ksh{product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Details
                                </Button>
                                <Button size="small" color="secondary">
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>    
                ))}
            </Grid>
        </Box>
    );
};

export default CustomerPage;