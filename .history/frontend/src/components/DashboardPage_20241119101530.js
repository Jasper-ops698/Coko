import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';

function DashboardPage() {
    const metrics = [
        { title: 'Total Sales', value: 'Ksh 0.00' },
        { title: 'Active Customers', value: '0' },
        { title: 'Pending Orders', value: '0' },
    ];

    const navigate = useNavigate()

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
                              style={{ marginTop: '10px' }}
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
                            <Typography variant="h5">Manage Products</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Add, edit, or remove your products from the store.
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => navigate('/profile')}
                              style={{ marginTop: '10px' }}
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