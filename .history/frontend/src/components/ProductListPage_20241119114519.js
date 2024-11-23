import React, { useState } from 'react';
import { Typography, Button, TextField, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const navigate = useNavigate();

   // State to manage the product list
   const [products, setProducts] = useState([]);

   // State for the new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      setProducts([...products, newProduct]); // Add new product to the list
      setNewProduct({ name: '', price: '', description: '' }); // Reset form
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {/* Add Product Form */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Grid>
      </Grid>

      {/* Display Product List */}
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ margin: '20px' }}>
            No products added yet.
          </Typography>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '10px' }}
        onClick={() => alert('Add Product functionality here!')}
      >
        Add Product
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </div>
  );
};


export default ProductListPage;