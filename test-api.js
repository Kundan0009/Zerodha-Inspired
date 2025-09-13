const axios = require('axios');

const API_BASE = 'http://localhost:8000/api';

async function testAPI() {
  console.log('🧪 Testing Zerodha Clone API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', health.data);

    // Test 2: Add Holdings
    console.log('\n2. Adding Sample Holdings...');
    const addHoldings = await axios.get(`${API_BASE}/addHoldings`);
    console.log('✅ Add Holdings:', addHoldings.data);

    // Test 3: Get All Holdings
    console.log('\n3. Fetching All Holdings...');
    const holdings = await axios.get(`${API_BASE}/allHoldings`);
    console.log('✅ Holdings Count:', holdings.data.length);

    // Test 4: Add Positions
    console.log('\n4. Adding Sample Positions...');
    const addPositions = await axios.get(`${API_BASE}/addPositions`);
    console.log('✅ Add Positions:', addPositions.data);

    // Test 5: Get All Positions
    console.log('\n5. Fetching All Positions...');
    const positions = await axios.get(`${API_BASE}/allPositions`);
    console.log('✅ Positions Count:', positions.data.length);

    // Test 6: Create New Order
    console.log('\n6. Creating New Order...');
    const newOrder = await axios.post(`${API_BASE}/newOrder`, {
      name: 'TESTSTOCK',
      qty: 10,
      price: 100.50,
      mode: 'BUY'
    });
    console.log('✅ New Order:', newOrder.data);

    // Test 7: Get All Orders
    console.log('\n7. Fetching All Orders...');
    const orders = await axios.get(`${API_BASE}/allOrders`);
    console.log('✅ Orders Count:', orders.data.length);

    // Test 8: Invalid Order (should fail)
    console.log('\n8. Testing Invalid Order...');
    try {
      await axios.post(`${API_BASE}/newOrder`, {
        name: 'INVALID',
        qty: -1,
        price: 0,
        mode: 'INVALID'
      });
    } catch (err) {
      console.log('✅ Invalid Order Rejected:', err.response.data.error);
    }

    console.log('\n🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run tests
testAPI();