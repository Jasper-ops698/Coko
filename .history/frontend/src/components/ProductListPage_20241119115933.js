import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  } from '@mui/material';
  
  const ProductListPage = () => {
    const navigate = useNavigate();
    // State to manage the product list
    const [products, setProducts] = useState([]);
  
    // State for modal visibility
    const [open, setOpen] = useState(false);
  
    // State for the new product form
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      description: '',
    });
  
    // Open the modal
    const handleOpen = () => setOpen(true);
  
    // Close the modal
    const handleClose = () => {
      setOpen(false);
      setNewProduct({ name: '', price: '', description: '' }); // Reset the form
    };
  
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProduct({ ...newProduct, [name]: value });
    };
  
    // Add a new product to the list
    const handleAddProduct = () => {
      if (newProduct.name && newProduct.price && newProduct.description) {
        setProducts([...products, newProduct]); // Update product list
        handleClose(); // Close the modal
      } else {
        alert('Please fill out all fields');
      }
    };
  
    return (
      <div>
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
        <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
      </div>
    );
  };


export default ProductListPage;