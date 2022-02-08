import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./Components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch data from js
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  //Add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify(task),
    });
const data  = await res.json()
setTasks([...tasks,data])
  
  };
  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //Fetch Task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks${id}`);
    const data = await res.json();
    return data;
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
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task to show"
      )}
    </div>
  );
}

export default App;
