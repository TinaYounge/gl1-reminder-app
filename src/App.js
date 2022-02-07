import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      day: "Feb 5th at 3:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Teacher Appointment",
      day: "Mar 5th at 5:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Boyfriend Appointment",
      day: "May 5th at 9:30pm",
      reminder: false,
    },
  ]);
  //Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //Toggle Reminder
  const toggleReminder = (id) => {
  
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task to show"
      )}
    </div>
  );
}

export default App;
