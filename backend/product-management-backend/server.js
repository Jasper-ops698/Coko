const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const adminRoutes = require('./adminRoutes');
const User = require('./UserSchema');
const bcrypt = require('bcrypt');
const roles = require('./roles');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Add rate limiting middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Use admin routes
app.use('/api', adminRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware to verify the Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (![roles.ADMIN, roles.MASTER_ADMIN].includes(role)) {
    return res.status(403).send('Permission denied: Only admins can access this data');
  }
  next();
};

// Middleware to verify master admin role
const verifyMasterAdmin = (req, res, next) => {
  const masterAdminUid = process.env.UID;
  if (req.user.uid !== masterAdminUid) {
    return res.status(403).send('Permission denied: Only the master admin can perform this action');
  }
  next();
};

// Middleware to ensure not blocking or deleting the master admin
const ensureNotMasterAdmin = (req, res, next) => {
  const masterAdminUid = process.env.UID;
  if (req.body.uid === masterAdminUid) {
    return res.status(403).send('Action denied: Cannot delete or block the master admin');
  }
  next();
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount);
};

// Endpoint to get user role
app.get('/api/getUserRole', verifyToken, (req, res) => {
  const role = req.user.role;
  if (!role) {
    return res.status(404).send('Role not found');
  }
  res.status(200).send({ role });
}); 

// Route to register a new user
app.post('/api/register', async (req, res) => {
  const { uid, email, password, role } = req.body;

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    if (![roles.CUSTOMER, roles.SELLER].includes(role)) {
      return res.status(400).json('Invalid role provided');
    }

    // Save user to MongoDB
    const newUser = new User({ uid, email, password, role });
    await newUser.save();

    // Update Firebase custom claims
    const customClaims = { role };
    await admin.auth().setCustomUserClaims(uid, customClaims);

    res.status(200).json({ message: `${role} role assigned successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign role" });
  }
});

// Route to login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const { uid, role } = user;

    // Generate token or any other required details for the frontend
    const token = await admin.auth().createCustomToken(uid);

    res.status(200).json({
      message: 'Login successful',
      user: {
        uid,
        email: user.email,
        role,
        token, // Send back the token
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


// Endpoint to assign admin role (master admin only)
app.post('/api/setAdminRole', verifyToken, verifyMasterAdmin, async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    res.status(200).send(`Admin role assigned successfully to user ${uid}`);
  } catch (error) {
    console.error('Error assigning admin role:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to delete a user (admin and master admin only)
app.delete('/api/deleteUser', verifyToken, verifyAdmin, ensureNotMasterAdmin, async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send(`User ${uid} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to block a user (admin and master admin only)
app.post('/api/blockUser', verifyToken, verifyAdmin, ensureNotMasterAdmin, async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().updateUser(uid, { disabled: true });
    res.status(200).send(`User ${uid} blocked successfully`);
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get seller data (admin and master admin only)
app.get('/api/sellerData', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' });
    res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching seller data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get customer data (admin and master admin only)
app.get('/api/customerData', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get analytics (admin and master admin only)
app.get('/api/analytics', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const analytics = {
      totalUsers: await User.countDocuments(),
      totalSellers: await User.countDocuments({ role: 'seller' }),
      totalCustomers: await User.countDocuments({ role: 'customer' }),
      totalSales: await User.aggregate([
        { $unwind: "$sales" },
        { $group: { _id: null, total: { $sum: "$sales.total" } } }
      ]),
      totalProducts: await User.aggregate([
        { $unwind: "$products" },
        { $group: { _id: null, total: { $sum: 1 } } }
      ])
    };

    // Format currency in the response
    analytics.totalSales = analytics.totalSales.map(sale => ({
      ...sale,
      total: formatCurrency(sale.total)
    }));

    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
