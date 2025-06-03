import React from 'react';
import { Typography, Box } from '@mui/material';

function NotAuthorizedPage() {
    return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h1" gutterBottom>
                403 - Forbidden
            </Typography>
            <Typography variant="h6">
                You do not have permission to view this page.
            </Typography>
        </Box>
    );
}

export default NotAuthorizedPage;
