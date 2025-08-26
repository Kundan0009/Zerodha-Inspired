# Dashboard - Zerodha Clone

React-based trading dashboard with real-time portfolio management.

## 🚀 Quick Start

```bash
npm install
set PORT=3004 && npm start
```

**Dashboard runs on:** http://localhost:3004

## 🎯 Features

### Portfolio Management
- Real-time holdings tracking
- P&L calculations
- Interactive charts
- Position monitoring

### Trading
- Order placement
- Order history
- Buy/Sell actions
- Portfolio summary

### User Experience
- Loading states
- Error handling
- Responsive design
- Real-time updates

## 🔧 Configuration

API endpoint: `http://localhost:3003/api`

Set custom API URL:
```bash
set REACT_APP_API_URL=http://your-api-url/api
```

## 📊 Components

- `Holdings` - Portfolio holdings view
- `Positions` - Active positions
- `Orders` - Order management
- `BuyActionWindow` - Order placement
- `Dashboard` - Main layout

## 🛠️ API Integration

Uses centralized API service (`src/utils/api.js`) with:
- Axios interceptors
- Error handling
- Authentication ready
- Request/response logging