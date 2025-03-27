require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
const UserInfo = require("./Models/User");
const { v4: uuidv4 } = require("uuid");

const port = process.env.PORT;

const app = express();
app.use(cors({
  origin: "https://to-do-mern-stack-delta.vercel.app",
  credentials: true
}));

// app.use(cors({ origin: "*" }));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Altas");
  })
  .catch((err) => console.log(err));

app.get("/get/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return res.status(401).json({ message: "User Id is required" });
  }
  TodoModel.find({ user_id: user_id, done: false })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/history/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return res.status(401).json({ message: "User Id is required" });
  }
  TodoModel.find({ user_id: user_id, done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new UserInfo({
    username,
    email,
    password,
  });

  newUser
    .save()
    .then((savedUser) => {
      console.log("User Created Successfully:", savedUser);
      res.status(201).json({ user_id: savedUser.user_id }); // Send response here
    })
    .catch((err) => {
      console.log("Error creating user:", err);
      if (!res.headersSent) {
        // Prevent sending response twice
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserInfo.findOne({ email, password })
    .then((user) => {
      if (user) {
        const user_id = user.user_id;
        console.log("Login Details", {
          user_id: user_id,
          email: email,
          password: password,
        });
        res.status(200).json({ user_id });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log("Login Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post("/add", (req, res) => {
  const { user_id, task, dueDate } = req.body;
  console.log("New Task Added", {
    user_id: user_id,
    task: task,
    dueDate: dueDate,
  });
  if (!task || !dueDate) {
    return res.status(400).json({ message: "Task is Required" });
  }
  TodoModel.create({ task, dueDate, user_id })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error creating task:", err);
      res.status(500).json({ error: "Error creating task" });
    });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);

  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error("Error updating task:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error updating task" });
      }
    });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
