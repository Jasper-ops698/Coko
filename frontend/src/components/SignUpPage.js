import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, MenuItem, FormControl, InputLabel, Select, CircularProgress } from '@mui/material';
import axios from 'axios';
import bcrypt from 'bcrypt';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateEmail(email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Save the user to your backend
      await axios.post('/api/register', {
        uid: user.uid,
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        role: role.trim()
      });

      navigate(role === 'seller' ? '/dashboard' : '/customer'); 
    } catch (error) {
      setError(`Signup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, boxShadow: 3 }}
    >
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}
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
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default SignUpPage;
