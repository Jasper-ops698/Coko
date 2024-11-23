import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        businessName: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log('Updated profile:', profile);
        // Backend logic
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Business Name"
              name="businessName"
              value={profile.businessName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
            <TextField
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
            <Button variant='contained' color='primary' type="submit">
                Save Changes
            </Button>
        </Box>
    );
};

export default UserProfile;