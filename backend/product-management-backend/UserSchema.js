const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  type: String,
  serialNumber: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const SaleSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['MasterAdmin', 'customer', 'seller', 'admin'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'blocked'],
    default: "Active"
  },
  products: [ProductSchema],
  sales: [SaleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
