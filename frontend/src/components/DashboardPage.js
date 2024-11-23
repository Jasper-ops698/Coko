import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const metrics = [
        { title: 'Total Sales', value: 'Ksh 0.00' },
        { title: 'Active Customers', value: '0' },
        { title: 'Pending Orders', value: '0' },
    ];

    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={2}>
                Welcome to Your Dashboard
            </Typography>
            <Typography>
                This is your space to manage products, view analytics, and explore tools to grow your business.
            </Typography>
            <Grid container spacing={3}>
                {/* Card for Products */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Manage Products</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Add, edit, or remove your products from the store.
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => navigate('/products')}
                              sx={{ mt: 2 }}
                            >
                                View your products
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Card for Profile */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Manage Profile</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Edit your profile information and preferences.
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => navigate('/profile')}
                              sx={{ mt: 2 }}
                            >
                                View your Profile
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={3}>
                {metrics.map((metric, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{metric.title}</Typography>
                                <Typography variant="h4">{metric.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DashboardPage;
