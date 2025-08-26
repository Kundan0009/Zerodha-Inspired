require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Import models at the top
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - restrict to specific origins
app.use(cors({
  origin: ['http://localhost:3004', 'http://localhost:3005'],
  credentials: true
}));

// Body parsing middleware (using express built-in)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
};

// Input validation middleware
const validateOrderInput = (req, res, next) => {
  const { name, qty, price, mode } = req.body;
  
  if (!name || !qty || !price || !mode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (typeof qty !== 'number' || qty <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Invalid price' });
  }
  
  next();
};

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/api/addHoldings", async (req, res) => {
  try {
    const tempHoldings = [
      {
        name: "BHARTIARTL",
        qty: 2,
        avg: 538.05,
        price: 541.15,
        net: "+0.58%",
        day: "+2.99%",
      },
      {
        name: "HDFCBANK",
        qty: 2,
        avg: 1383.4,
        price: 1522.35,
        net: "+10.04%",
        day: "+0.11%",
      },
      {
        name: "HINDUNILVR",
        qty: 1,
        avg: 2335.85,
        price: 2417.4,
        net: "+3.49%",
        day: "+0.21%",
      },
      {
        name: "INFY",
        qty: 1,
        avg: 1350.5,
        price: 1555.45,
        net: "+15.18%",
        day: "-1.60%",
        isLoss: true,
      },
      {
        name: "ITC",
        qty: 5,
        avg: 202.0,
        price: 207.9,
        net: "+2.92%",
        day: "+0.80%",
      },
      {
        name: "KPITTECH",
        qty: 5,
        avg: 250.3,
        price: 266.45,
        net: "+6.45%",
        day: "+3.54%",
      },
      {
        name: "M&M",
        qty: 2,
        avg: 809.9,
        price: 779.8,
        net: "-3.72%",
        day: "-0.01%",
        isLoss: true,
      },
      {
        name: "RELIANCE",
        qty: 1,
        avg: 2193.7,
        price: 2112.4,
        net: "-3.71%",
        day: "+1.44%",
      },
      {
        name: "SBIN",
        qty: 4,
        avg: 324.35,
        price: 430.2,
        net: "+32.63%",
        day: "-0.34%",
        isLoss: true,
      },
      {
        name: "SGBMAY29",
        qty: 2,
        avg: 4727.0,
        price: 4719.0,
        net: "-0.17%",
        day: "+0.15%",
      },
      {
        name: "TATAPOWER",
        qty: 5,
        avg: 104.2,
        price: 124.15,
        net: "+19.15%",
        day: "-0.24%",
        isLoss: true,
      },
      {
        name: "TCS",
        qty: 1,
        avg: 3041.7,
        price: 3194.8,
        net: "+5.03%",
        day: "-0.25%",
        isLoss: true,
      },
      {
        name: "WIPRO",
        qty: 4,
        avg: 489.3,
        price: 577.75,
        net: "+18.08%",
        day: "+0.32%",
      },
    ];

    await HoldingsModel.insertMany(tempHoldings);
    res.json({ message: "Holdings added successfully", count: tempHoldings.length });
  } catch (error) {
    console.error('Error adding holdings:', error.message);
    res.status(500).json({ error: 'Failed to add holdings' });
  }
});

app.get("/api/addPositions", async (req, res) => {
  try {
    const tempPositions = [
      {
        product: "CNC",
        name: "EVEREADY",
        qty: 2,
        avg: 316.27,
        price: 312.35,
        net: "+0.58%",
        day: "-1.24%",
        isLoss: true,
      },
      {
        product: "CNC",
        name: "JUBLFOOD",
        qty: 1,
        avg: 3124.75,
        price: 3082.65,
        net: "+10.04%",
        day: "-1.35%",
        isLoss: true,
      },
    ];

    await PositionsModel.insertMany(tempPositions);
    res.json({ message: "Positions added successfully", count: tempPositions.length });
  } catch (error) {
    console.error('Error adding positions:', error.message);
    res.status(500).json({ error: 'Failed to add positions' });
  }
});

app.get("/api/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error('Error fetching holdings:', error.message);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

app.get("/api/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error('Error fetching positions:', error.message);
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
});

app.post("/api/newOrder", validateOrderInput, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    
    const newOrder = new OrdersModel({
      name: name.toString().substring(0, 50), // Sanitize input
      qty: Number(qty),
      price: Number(price),
      mode: mode.toString().substring(0, 10), // Sanitize input
      timestamp: new Date()
    });

    await newOrder.save();
    res.json({ message: "Order saved successfully", orderId: newOrder._id });
  } catch (error) {
    console.error('Error saving order:', error.message);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

app.get("/api/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ timestamp: -1 });
    res.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
  console.error('❌ MongoDB Error:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});