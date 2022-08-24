import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
      });
      alert("we shipped something, man. Hope it's good!");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addTask" name="addTask">
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value.toUpperCase())}
        value={title}
        placeholder="Enter title"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task decription"
        value={description}
      ></textarea>
      <button type="submit">Done</button>
    </form>
  );
};

export default AddTask;
