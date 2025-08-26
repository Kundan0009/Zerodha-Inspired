import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { apiService } from "../utils/api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyClick = async () => {
    if (!uid || stockQuantity <= 0 || stockPrice <= 0) {
      setError("Please enter valid quantity and price");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await apiService.createOrder({
        name: uid,
        qty: parseInt(stockQuantity),
        price: parseFloat(stockPrice),
        mode: "BUY",
      });

      // Show success message
      alert("Order placed successfully!");
      GeneralContext.closeBuyWindow();
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  const calculateMargin = () => {
    const margin = stockQuantity * stockPrice * 0.2; // 20% margin
    return margin.toFixed(2);
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4>Buy {uid}</h4>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              disabled={loading}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              disabled={loading}
            />
          </fieldset>
        </div>

        <div className="order-summary">
          <p>Total Value: ₹{(stockQuantity * stockPrice).toFixed(2)}</p>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{calculateMargin()}</span>
        <div>
          <button 
            className="btn btn-blue" 
            onClick={handleBuyClick}
            disabled={loading || !uid || stockQuantity <= 0 || stockPrice <= 0}
          >
            {loading ? "Placing..." : "Buy"}
          </button>
          <button 
            className="btn btn-grey" 
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;