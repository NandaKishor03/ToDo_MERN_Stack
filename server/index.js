const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Nanda")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/history", (req, res) => {
  TodoModel.find({ done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// app.post("/add", (req, res) => {  
//   const task = req.body.task;
//   const dueDate = req.body.dueDate;
//   if (!task) {
//     return res.status(400).json({ message: "Task is Required" });
//   }
//   TodoModel.create({
//     task: task,
//     dueDate: dueDate,
//   })
//   .then((result) => res.json(result))
//   .catch((err) => res.json(err));
//   console.log("Request received", req.body);
// });

app.post("/add", (req, res) => {  
  console.log("Request received:", req.body);  // Debugging Line
  const { task, dueDate } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is Required" });
  }

  TodoModel.create({ task, dueDate })
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
