import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import fetchUserRole from './utils/fetchUserRole';  // Ensure the correct import path

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    try {
      // Direct pass for master admin using environment variables
      if (email === process.env.REACT_APP_MASTERADMIN_EMAIL && password === process.env.REACT_APP_MASTERADMIN_PASSWORD) {
        setError('');
        alert('Welcome, Master Admin!');
        navigate('/MasterAdmin');  // Redirect to MasterAdminPage
        return;
      } 

      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        const { user } = response.data;

        console.log('User logged in:', user);

        // Fetch the ID token and custom claims from Firebase (if needed)
        await signInWithEmailAndPassword(auth, email, password);

        // Fetch the user role
        const role = await fetchUserRole();

        console.log('User role:', role);

        if (!role) {
          throw new Error("User role is not defined");
        }

        setError('');
        alert('Login successful!');

        // Redirect based on role
        switch(role) {
          case 'seller':
            navigate('/dashboard');
            break;
          case 'customer':
            navigate('/customer');
            break;
          case 'admin':
            navigate('/admin');
            break;
          case 'MasterAdmin':
            navigate('/MasterAdmin');
            break;
          default:
            alert('Error: User role is not defined.');
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button variant="contained" type="submit" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginPage;
