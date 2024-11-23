import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function HomePage() {
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant='h4' align='center' gutterBottom>
                        Karibu Coko
                    </Typography>
                    <Typography align='center'>
                        Fanya biashara online with ease.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default HomePage;