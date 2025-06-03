import  React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Pay = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    const  handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit order logic
        console.log("Order submitted:", formData);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Pay
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    label="Delivery Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Place Order
                </Button>
            </form>
        </Box>
    );
};

export default Pay;