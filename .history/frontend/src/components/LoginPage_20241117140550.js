import React from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

function LoginPage() {
    return(
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form>
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
                        type='password'
                        variant='outlined'
                        margin='normal'
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit" variant='contained' color='primary' fullWidth>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default LoginPage;