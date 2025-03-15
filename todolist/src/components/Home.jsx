import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTaskId, setNewTaskId] = useState(null);

  const user_id = localStorage.getItem("User_id")

  // Fetch tasks from backend
  useEffect(() => {
    if (user_id){
      axios
        .get(`http://localhost:5000/get/${user_id}`)
        .then((result) => {
          setTodos(result.data);
        })
        .catch((err) => console.error("Error fetching data:", err));
      }
    }, [user_id]);

  // Handle Task Completion
  const handleComplete = (id) => {
    axios
      .put(`http://localhost:5000/update/${id}`)
      .then(() => {
        setTimeout(() => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        }, 1000);
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Handle Task Deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error("Error Deleting Task:", err));
  };

  // Modified Create component to track newly added tasks
  const handleNewTask = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTaskId(newTask._id);

    // Clear the "new" status after animation completes
    setTimeout(() => {
      setNewTaskId(null);
    }, 1500);
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <Create setTodos={handleNewTask} todos={todos} />
      <br />
      <div className="new-task">
        {todos.length === 0 ? (
          <p>No Todos</p>
        ) : (
          todos.map((todo) => (
            <div
              className={`task ${todo._id === newTaskId ? "task-new" : ""}`}
              key={todo._id}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={todo.done || false}
                  onChange={() => handleComplete(todo._id)}
                />
                <div>
                  <h3>
                    {todo.task}{" "}
                    <span className="task-date">{todo.dueDate}</span>
                  </h3>
                </div>
              </div>
              <button
                className="delete-icon"
                onClick={() => handleDelete(todo._id)}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
