import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import "../css/Home.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTaskId, setNewTaskId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("today");
  const [category, setCategory] = useState({
    yesterday: [],
    today: [],
    tomorrow: [],
  });

  const user_id = localStorage.getItem("User_id");

  const fetchTodos = () => {
    if (user_id) {
      axios
        .get(`https://todo-backend-uzg4.onrender.com/get/${user_id}`)
        .then((result) => {
          setTodos(result.data);
          categorizeTodos(result.data);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  };

  // Fetch tasks from backend
  useEffect(() => {
    fetchTodos();
  }, [user_id]);

  // Handle Task Completion
  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    categorizeTodos(updatedTodos);

    axios
      .put(`https://todo-backend-uzg4.onrender.com/update/${id}`)
      .then(() => fetchTodos())
      .catch((err) => {
        console.error("Error updating task:", err);
        fetchTodos(); 
      });
  };

  // Handle Task Deletion
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
    categorizeTodos(updatedTodos);

    axios
      .delete(`https://todo-backend-uzg4.onrender.com/delete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => {
        console.error("Error Deleting Task:", err);
        fetchTodos(); 
      });
  };

  const handleNewTask = (newTask) => {
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    categorizeTodos(updatedTodos);
    setNewTaskId(newTask._id);

    setTimeout(() => {
      setNewTaskId(null);
    }, 1500);
  };

  const categorizeTodos = (todoList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterdayTasks = todoList.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return dueDate < today;
    });

    const todayTasks = todoList.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return dueDate.getTime() === today.getTime();
    });

    const tomorrowTasks = todoList.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return dueDate > today;
    });

    setCategory({
      yesterday: yesterdayTasks,
      today: todayTasks,
      tomorrow: tomorrowTasks,
    });
  };

  const renderTasks = (tasks) =>
    tasks.length === 0 ? (
      <p className="no-task">No tasks available</p>
    ) : (
      tasks.map((todo) => (
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
                {todo.task} <span className="task-date">{todo.dueDate}</span>
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
    );

  return (
    <div className="container">
      <h2>Todo List</h2>
      <Create setTodos={handleNewTask} todos={todos} />
      <br />

      <div className="category-nav">
        <button
          className={activeCategory === "yesterday" ? "active" : ""}
          onClick={() => setActiveCategory("yesterday")}
        >
          Not Yet Completed ({category.yesterday.length})
        </button>
        <button
          className={activeCategory === "today" ? "active" : ""}
          onClick={() => setActiveCategory("today")}
        >
          Today's Tasks ({category.today.length})
        </button>
        <button
          className={activeCategory === "tomorrow" ? "active" : ""}
          onClick={() => setActiveCategory("tomorrow")}
        >
          Future Tasks ({category.tomorrow.length})
        </button>
      </div>

      <div className="task-container1">
        {activeCategory === "yesterday" && renderTasks(category.yesterday)}

        {activeCategory === "today" && renderTasks(category.today)}

        {activeCategory === "tomorrow" && renderTasks(category.tomorrow)}
      </div>
    </div>
  );
}

export default Home;
