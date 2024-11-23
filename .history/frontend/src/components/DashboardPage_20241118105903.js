import React from "react";
import { Typography, Box } from "@mui/material";

function DashboardPage() {
    return (
        <Box sx={{ p:4 }}>
            <Typography variant="h4" mb={2}>
                Welcome to Your Dashboard
            </Typography>
            <Typography>
                This is your space to manage products, view analytics, and explore tools to grow your business.
            </Typography>
        </Box>
    );
}

export default DashboardPage;