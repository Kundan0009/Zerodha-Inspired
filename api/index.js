const mockHoldings = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%"
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%"
  }
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { url } = req;
  
  if (url === '/api/health') {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  } else if (url === '/api/allHoldings') {
    res.json(mockHoldings);
  } else if (url === '/') {
    res.json({ message: "Zerodha Clone API", endpoints: ["/api/health", "/api/allHoldings"] });
  } else {
    res.status(404).json({ error: "Route not found" });
  }
};

