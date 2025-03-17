const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    task: { type: String, required: true },
    dueDate: { type: Date, required: true },
    done: { type: Boolean, default: false },
  },
  { collection: "todos" }
);

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
