import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/sales"); // Replace with your backend URL
      const data = await response.json();
      setSales(data);

      // Calculate total revenue
      const revenue = data.reduce((total, sale) => total + sale.price * sale.quantity, 0);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error("Error fetching sales data:", error.message);
    }
  };

  return (
    <div>
      <Button variant="" color="secondary" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Sales History
      </Typography>
      <Typography variant="h6" align="center" color="primary">
        Total Revenue: Ksh{totalRevenue.toFixed(2)}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale._id}>
                <TableCell>{sale.productName}</TableCell>
                <TableCell>{sale.category}</TableCell>
                <TableCell>{sale.type}</TableCell>
                <TableCell>Ksh{sale.price.toFixed(2)}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SalesPage;
