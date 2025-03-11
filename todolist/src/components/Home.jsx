import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import {
  BsCircle,
  BsFillTrashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle Task Completion
  const handleComplete = (id) => {
    axios
      .put(`http://localhost:5000/update/${id}`)
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.error("Error Completing Task:", err));
  };

  // Handle Task Deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((result) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error("Error Deleteing Task:", err));
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <Create setTodos={setTodos} todos={todos} />
      <br />

      {todos.length === 0 ? (
        <p>No Todos</p>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleComplete(todo._id)}>
              {todo.done === true ? (
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
              ) : (
                <BsCircle className="icon" />
              )}
              <h3 className={todo.done === true ? "line_make" : ""}>
                {todo.task} - {todo.dueDate}
              </h3>
            </div>
            <div>
              <BsFillTrashFill
                className="icon delete"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

