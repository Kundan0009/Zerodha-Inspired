const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Simple schema
const holdingSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String
});

const HoldingsModel = mongoose.model("holding", holdingSchema);

// Connect to MongoDB
const uri = process.env.MONGO_URL;
if (uri) {
  mongoose.connect(uri).catch(err => console.log(err));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Zerodha Clone API", endpoints: ["/api/health", "/api/allHoldings"] });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;