import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/History.css"

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem("User_id")
 

  useEffect(() => {
    setLoading(true);
    if (user_id){
      
      axios
        .get(`https://todo-backend-uzg4.onrender.com/history/${user_id}`)
        .then((result) => {
          setHistory(result.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error getting the Completed Todo's", err);
          setLoading(false);
        });
    }
  }, [user_id]);

  return (
    <div className="history-container">
      <h1 className="history-title">Todo's Already Completed</h1>

      <div className="history-list">
        {loading ? (
          <div className="history-loading">Loading completed tasks...</div>
        ) : history.length === 0 ? (
          <div className="history-empty">No completed tasks yet</div>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={item._id || index}>
              {item.task}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
