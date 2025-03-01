import React from "react";
import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="Button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
