import React from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

function SignUpPage() {
    return(
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant='h4' gutterBottom>
                    Sign Up
                </Typography>
                <form>
                    <TextField
                       fullWidth
                       label="Full Name"
                       variant='outlined'
                       margin='normal'
                       required
                    />
                    <TextField
                       fullWidth
                       label="Email"
                       variant='outlined'
                       margin='normal'
                       required
                    />
                    <TextField
                       fullWidth
                       label="Password"
                       type="password"
                       variant='outlined'
                       margin='normal'
                       required
                    />
                    <Box mt={2}>
                        <Button type="submit" variant='contained' color='primary' fullWidth>
                            Sign Up
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default SignUpPage;