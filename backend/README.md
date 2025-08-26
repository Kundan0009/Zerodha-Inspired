# Backend API - Zerodha Clone

Secure Node.js/Express API with MongoDB integration.

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
npm start
```

**Server runs on:** http://localhost:3003

## 🔧 Environment Setup

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3003
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3004,http://localhost:3005
```

## 🚦 API Endpoints

### Holdings
- `GET /api/allHoldings` - Get all holdings
- `GET /api/addHoldings` - Add sample data

### Positions  
- `GET /api/allPositions` - Get all positions
- `GET /api/addPositions` - Add sample data

### Orders
- `GET /api/allOrders` - Get order history
- `POST /api/newOrder` - Create new order

### System
- `GET /api/health` - Health check

## 🔒 Security Features

- Rate limiting (100 req/15min)
- CORS protection
- Input validation
- Helmet.js security headers
- JWT authentication ready

## 📊 Database Schema

### Order Schema
```javascript
{
  name: String (required, max 50),
  qty: Number (required, min 1),
  price: Number (required, min 0.01),
  mode: String (enum: ['BUY', 'SELL']),
  timestamp: Date (auto-generated)
}
```