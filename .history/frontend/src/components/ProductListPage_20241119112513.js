import React, { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', description: 'Description of Product A' },
    { id: 2, name: 'Product B', description: 'Description of Product B' },
  ]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
          </ListItem>
        ))}
      </List>
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