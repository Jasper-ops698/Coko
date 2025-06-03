import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, Snackbar, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ProductsListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", type: "", serialNumber: "", description: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(["Electronics", "Furniture", "Clothing"]);
  const [types, setTypes] = useState(["New", "Used"]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your method to get the token
        const response = await axios.get("http://localhost:4000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Replace with your method to get the token
      await axios.delete(`http://localhost:4000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter((product) => product._id !== productId));
      setMessage("Product deleted successfully!");
      setOpenSnackbar(true);
    } catch (err) {
      setError("Error deleting product");
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("type", newProduct.type);
    formData.append("serialNumber", newProduct.serialNumber);
    formData.append("description", newProduct.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem('token'); // Replace with your method to get the token
      const response = await axios.post("http://localhost:4000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setProducts([...products, response.data]);
      setOpenModal(false);
      setMessage("Product added successfully!");
      setOpenSnackbar(true);
      setNewProduct({ name: "", price: "", category: "", type: "", serialNumber: "", description: "" });
      setImageFile(null);
    } catch (err) {
      setError("Error adding product");
      setOpenSnackbar(true);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleAddType = () => {
    if (newType && !types.includes(newType)) {
      setTypes([...types, newType]);
      setNewType("");
    }
  };

  return (
    <Box p={3}>
      <IconButton onClick={() => navigate('/dashboard')} color="primary">
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} mb={3}>
        Add New Product
      </Button>

      {products.length ? (
        products.map((product) => (
          <Box key={product._id} border={1} borderRadius={1} p={2} mb={2}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">Price: Ksh{product.price}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            {product.type && <Typography variant="body2">Type: {product.type}</Typography>}
            {product.serialNumber && (
              <Typography variant="body2">Serial Number: {product.serialNumber}</Typography>
            )}
            {product.description && (
              <Typography variant="body2">Description: {product.description}</Typography>
            )}
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} width="100" height="100" />
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteProduct(product._id)}
              sx={{ mt: 1 }}
            >
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No products added yet.</Typography>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Add New Product</Typography>
          <TextField
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddCategory} sx={{ mt: 1 }}>
            Add Category
          </Button>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
            >
              {types.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="New Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddType} sx={{ mt: 1 }}>
            Add Type
          </Button>
          <TextField
            label="Serial Number (Optional)"
            name="serialNumber"
            value={newProduct.serialNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            style={{ marginTop: "10px" }}
          />
          {imageFile && <Typography variant="body2">Image Selected: {imageFile.name}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message || error}
      />
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '95%', sm: '85%', md: '70%', lg: '60%' },
  maxWidth: '500px', // Max width set to 500px
  height: '70vh', // Height to make it rectangular and spacious
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Add scrolling functionality
};


export default ProductsListPage;
