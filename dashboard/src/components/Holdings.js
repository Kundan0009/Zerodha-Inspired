import React, { useState, useEffect } from "react";
import { VerticalGraph } from "./VerticalGraph";
import { apiService } from "../utils/api";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllHoldings();
        setAllHoldings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching holdings:", err);
        setError("Failed to fetch holdings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const calculateTotals = () => {
    let totalInvestment = 0;
    let currentValue = 0;

    allHoldings.forEach(stock => {
      totalInvestment += stock.avg * stock.qty;
      currentValue += stock.price * stock.qty;
    });

    const pnl = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? ((pnl / totalInvestment) * 100) : 0;

    return {
      totalInvestment: totalInvestment.toFixed(2),
      currentValue: currentValue.toFixed(2),
      pnl: pnl.toFixed(2),
      pnlPercentage: pnlPercentage.toFixed(2)
    };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h3>Loading Holdings...</h3>
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

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totals = calculateTotals();

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - (stock.avg * stock.qty);
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    ₹{pnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ₹{totals.totalInvestment.split('.')[0]}.<span>{totals.totalInvestment.split('.')[1]}</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{totals.currentValue.split('.')[0]}.<span>{totals.currentValue.split('.')[1]}</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={parseFloat(totals.pnl) >= 0 ? "profit" : "loss"}>
            ₹{totals.pnl} ({totals.pnlPercentage >= 0 ? '+' : ''}{totals.pnlPercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;