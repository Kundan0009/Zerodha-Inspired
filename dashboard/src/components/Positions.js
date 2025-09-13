import React, { useState, useEffect, useCallback } from "react";
import { apiService } from "../utils/api";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRetry = useCallback(() => window.location.reload(), []);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllPositions();
        setAllPositions(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching positions:", err);
        setError("Failed to fetch positions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h3>Loading Positions...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - (stock.avg * stock.qty);
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    ₹{pnl.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;