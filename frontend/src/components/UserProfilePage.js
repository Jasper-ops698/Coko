import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);
        setUsername(currentUser.displayName);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        setMessage('Profile updated successfully');
        // Save the updated username to your backend
        await axios.post('/updateProfile', {
          uid: user.uid,
          username,
        });
      }
    } catch (err) {
      setError('Error updating profile');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Profile</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {message && <Typography color="primary">{message}</Typography>}
      <TextField
        fullWidth
        label="Email"
        value={email}
        disabled
        margin="normal"
      />
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        required
      />
      <Button variant="contained" onClick={handleProfileUpdate} sx={{ mt: 2 }}>
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfilePage;
