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
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
        >
            <Typography variant='h5' mb={2}>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin='normal'
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
        <Button variant='contained' type="submit" fullWidth>
            Login
        </Button>
        </Box>
    );
}

export default LoginPage;