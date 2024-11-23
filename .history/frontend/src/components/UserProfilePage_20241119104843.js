import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    businessName: 'John Enterprise',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <form>
        <TextField
          label="Name"
          name="name"
          value={profile.name}
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
          margin="normal"
        />
        <TextField
          label="Business Name"
          name="businessName"
          value={profile.businessName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '10px' }}
        onClick={() => alert('Save functionality here!')}
      >
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
        Back to Dashboard
      </Button>
    </div>
  );
};

export default UserProfilePage;