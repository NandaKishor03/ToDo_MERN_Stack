import React, { useState } from "react";
import axios from "axios";
import DueDate from "./DueDate";
import "./Create.css";

function Create({ setTodos, todos }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!task || !dueDate) {
      alert("Please enter both task and due date");
      return;
    }
    axios
      .post("http://localhost:5000/add", { task, dueDate })
      .then((response) => {
        setTask("");
        setDueDate("");
        setTodos((prevTodos) => [...prevTodos, response.data]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="task-container">
      <input
        type="text"
        placeholder="Enter Task"
        className="task-input"
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
