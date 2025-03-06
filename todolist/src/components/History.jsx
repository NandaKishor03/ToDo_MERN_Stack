import React, { useState, useEffect } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/history")
      .then((result) => setHistory(result.data))
      .catch((err) => console.error("Error getting the Completed Todo's", err));

    // return () => {
    //   setHistory([]);
    // };
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">Todo's Already Completed</h1>

      <div className="history-list">
        {history.length === 0 ? (
          <h1 className="history-empty">Todo Not Completed</h1>
        ) : (
          history.map((his, index) => (
            <div className="history-item" key={index}>
              {his.task}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
