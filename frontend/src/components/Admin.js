import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, TextField, Snackbar } from '@mui/material';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const Admin = () => {
  const [sellerData, setSellerData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken(true);

        const [sellersResponse, customersResponse, analyticsResponse] = await Promise.all([
          axios.get('/api/sellerData', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/customerData', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/analytics', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setSellerData(sellersResponse.data);
        setCustomerData(customersResponse.data);
        setAnalytics(analyticsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);

      const response = await axios.delete('/api/deleteUser', {
        headers: { Authorization: `Bearer ${token}` },
        data: { uid }
      });

      setMessage(response.data);
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };

  const handleBlockUser = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);

      const response = await axios.post('/api/blockUser', { uid }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(response.data);
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>Admin Dashboard</Typography>

      <Box mb={4}>
        <Typography variant="h6">Seller Data</Typography>
        <pre>{JSON.stringify(sellerData, null, 2)}</pre>
      </Box>

      <Box mb={4}>
        <Typography variant="h6">Customer Data</Typography>
        <pre>{JSON.stringify(customerData, null, 2)}</pre>
      </Box>

      <Box mb={4}>
        <Typography variant="h6">Analytics</Typography>
        <pre>{JSON.stringify(analytics, null, 2)}</pre>
      </Box>

      <Box mb={4}>
        <Typography variant="h6">Manage Users</Typography>
        <TextField
          fullWidth
          label="User ID (UID)"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" onClick={handleDeleteUser} fullWidth sx={{ mt: 2, mb: 2 }}>
          Delete User
        </Button>
        <Button variant="contained" color="warning" onClick={handleBlockUser} fullWidth>
          Block User
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message || error}
      />
    </Box>
  );
};

export default Admin;
