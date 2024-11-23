import React, { useState } from 'react';
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
        } catch (err) {
            setError(err.message);
        }
    };
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