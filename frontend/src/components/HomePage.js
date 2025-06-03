import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function HomePage() {
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', color: 'text.secondary' }}>
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
