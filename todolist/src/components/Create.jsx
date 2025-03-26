// require("dotenv").config();
import React, { useState } from "react";
import axios from "axios";
import DueDate from "./DueDate";

function Create({ setTodos }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!task || !dueDate) {
      alert("Please enter both task and due date");
      return;
    }

    const user_id = localStorage.getItem("User_id")
    const REACT_APP_BACKEND_URL="https://your-backend.onrender.com"
 
    axios
      .post(`${REACT_APP_BACKEND_URL}/add`, { task, dueDate ,user_id})
      .then((response) => {
        console.log("Response from server:", response.data);
        setTask("");
        setDueDate("");

        // Pass the newly created task to the parent component
        if (response.data && response.data._id) {
          setTodos(response.data);
        } else {
          console.error("Invalid response data structure:", response.data);
        }
      })
      .catch((err) => {
        console.error("Error adding task:", err);
        alert("Failed to add task. Please try again.");
      });
  };

  return (
    <div className="task-container2">
      <input
        type="text"
        placeholder="✏️ Add your task..."
        className="task-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <DueDate onDateSelect={setDueDate} />
      <button type="button" className="add-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
