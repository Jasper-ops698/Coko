const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(bodyparser.json());
 console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});