import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../utils/api";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllOrders();
        setAllOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h3>Loading Orders...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
              const orderTime = new Date(order.timestamp || order.createdAt).toLocaleTimeString();
              const modeClass = order.mode === 'BUY' ? 'profit' : 'loss';

              return (
                <tr key={order._id || index}>
                  <td>{orderTime}</td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price.toFixed(2)}</td>
                  <td className={modeClass}>{order.mode}</td>
                  <td className="profit">COMPLETE</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>Total Orders: {allOrders.length}</h5>
        </div>
        <div className="col">
          <h5>
            Total Value: ₹{allOrders.reduce((sum, order) => sum + (order.qty * order.price), 0).toFixed(2)}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Orders;