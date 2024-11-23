import axios from 'axios';
import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]); // Product list state
  const [open, setOpen] = useState(false); // Modal visibility state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null, // Image state
  });

  const navigate = useNavigate(); // React Router navigation hook

  // Handle opening/closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({ name: '', price: '', description: '', image: null }); // Reset form
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: URL.createObjectURL(file) });
    }
  };

  // Add a new product to the list
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      setProducts([...products, newProduct]);
      handleClose(); // Close modal
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div>
      {/* Back to Dashboard Button */}
      <IconButton onClick={() => navigate('/dashboard')} color="primary">
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>

      {/* Add Product Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" color="secondary">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {newProduct.image && (
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  Image Uploaded
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Product List */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">Price: Ksh{product.price}</Typography>
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
    </div>
  );
};


export default ProductListPage;