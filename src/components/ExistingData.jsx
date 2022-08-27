// react
import { useState, useEffect } from "react";
// components
import AddTask from "./AddTask";
import Task from "./Task";
// firebase library
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// local db config
import { db } from "../firebase";

export default function ExistingData() {
  const [tasks, setTasks] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "tasks"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <>
      <AddTask />
      {tasks.map((task) => (
        <Task
          id={task.id}
          title={task.data.title}
          description={task.data.description}
        />
      ))}
    </>
  );
}
