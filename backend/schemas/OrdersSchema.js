const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  mode: {
    type: String,
    required: true,
    enum: ['BUY', 'SELL']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = { OrdersSchema };