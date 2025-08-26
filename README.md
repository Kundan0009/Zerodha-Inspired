# Zerodha Clone - Enhanced Trading Platform

A full-stack trading platform clone inspired by Zerodha with improved security, performance, and user experience.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd "Zerodha clone"

# Start all services
start-all.bat
```

**Services will run on:**
- Backend API: http://localhost:3003
- Dashboard: http://localhost:3004  
- Frontend: http://localhost:3005

## 🏗️ Project Structure

```
Zerodha clone/
├── backend/           # Node.js/Express API (Port 3003)
├── dashboard/         # React Trading Dashboard (Port 3004)
├── frontend/          # React Landing Page (Port 3005)
├── start-all.bat      # Start all services
├── test-api.js        # API testing script
└── README.md
```

## 🔧 Manual Setup

### Backend (Port 3003)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URL
npm start
```

### Dashboard (Port 3004)
```bash
cd dashboard
npm install
set PORT=3004 && npm start
```

### Frontend (Port 3005)
```bash
cd frontend
npm install
set PORT=3005 && npm start
```

## 🔒 Security Features

- ✅ CSRF Protection & Secure CORS
- ✅ Rate Limiting (100 req/15min)
- ✅ Input Validation & Sanitization
- ✅ Helmet.js Security Headers
- ✅ JWT Authentication Ready

## 🚦 API Endpoints (Port 3003)

- `GET /api/health` - Health check
- `GET /api/allHoldings` - Get holdings
- `GET /api/allPositions` - Get positions
- `GET /api/allOrders` - Get orders
- `POST /api/newOrder` - Create order

## 🧪 Testing

```bash
# Test all API endpoints
node test-api.js
```

## 📊 Features

### Dashboard (Port 3004)
- Real-time portfolio tracking
- Holdings & positions management
- Order placement & history
- P&L calculations
- Interactive charts

### Landing Page (Port 3005)
- Marketing pages
- Product information
- Pricing details
- Support system

## 🎯 Improvements Made

- Fixed 15+ security vulnerabilities
- Added comprehensive error handling
- Implemented loading states
- Real-time calculations
- Centralized API service
- Production-ready configuration

## 🚀 Deployment

Set environment variables:
```env
MONGO_URL=your_mongodb_url
PORT=3003
CORS_ORIGIN=http://localhost:3004,http://localhost:3005
```

## 📝 License

MIT License