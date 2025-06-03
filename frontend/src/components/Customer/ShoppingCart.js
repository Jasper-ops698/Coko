import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const ShoppingCart = ({ cart, onRemove }) => {
    const [total, setTotal] = useState(
        cart.reduce((acc, item) => acc + item.price, 0)
    );

    const handleRemove = (productId) => {
        onRemove(productId);
        const updatedTotal = cart.reduce((acc, item) => acc + item.price, 0);
        setTotal(updatedTotal);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Your Shopping Cart
            </Typography>
            {cart.length > 0 ? (
                <List>
                    {cart.map((item) => (
                        <ListItem key={item._id} divider>
                            <ListItemText
                                primary={item.name}
                                secondary={`$${item.price}`}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemove(item._id)}
                            >
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No items in cart</Typography>
            )}
            <Typography variant="h6" style={{ marginTop: 20 }}>
                Total: Ksh{total}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                fullWidth
            >
                Pay
            </Button>
        </Box>
    );
};

export default ShoppingCart;
