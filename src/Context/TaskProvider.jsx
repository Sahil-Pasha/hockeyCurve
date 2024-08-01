import React, { useState, useEffect } from "react";
import TaskContext from "./TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredtasks, setFilteredTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [isAdded, setIsAdded] = useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSnooze, setIsSnooze] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve the data from local storage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Functions to Add, Edit, Delete, Priority tasks, Search and Sort Functions

  const addTask = (task) => {
    let res = filteredtasks.filter(
      (items) =>
        items.name.toLocaleUpperCase() === task.name.toLocaleUpperCase()
    );
    if (res.length === 0) {
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setIsAdded(true);
    } else {
      setIsPresent(true);
    }
  };

  const editTask = (updateTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updateTask.id ? updateTask : task
    );
    let res = updatedTasks.filter(
      (items) =>
        items.name.toLocaleUpperCase() === updateTask.name.toLocaleUpperCase()
    );
    if (res.length === 2) {
      setIsPresent(true);
    } else {
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setIsEdit(true);
    }
  };

  const deleteTask = (deleteTask) => {
    const updatedTasks = tasks.filter((task) => task.id !== deleteTask.id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const priorityTask = (priority) => {
    if (priority === "All") {
      setFilteredTasks(tasks);
    } else if (priority === "Done") {
      setFilteredTasks(tasks.filter((task) => task.status === "completed"));
    } else {
      setFilteredTasks(tasks.filter((task) => task.priority === priority));
    }
  };

  const searchTask = (taskTitle) => {
    if (!taskTitle) {
      setFilteredTasks(tasks);
    } else {
      const upperasedQuery = taskTitle.toLocaleUpperCase();
      const searchedTasks = tasks.filter((task) =>
        task.name.toLocaleUpperCase().includes(upperasedQuery)
      );
      setFilteredTasks(searchedTasks);
    }
  };

  const sortTasks = (option) => {
    if (option === "priority") {
      const high = filteredtasks.filter((items) => items.priority === "High");
      const medium = filteredtasks.filter(
        (items) => items.priority === "Medium"
      );
      const low = filteredtasks.filter((items) => items.priority === "Low");
      const sortedTasks = [...high, ...medium, ...low];
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);
    } else if (option === "dueDate") {
      const sortedTasks = [...filteredtasks].sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);
    }
  };

  const statusUpdate = (statusTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === statusTask.id ? { ...task, status: "completed" } : task
    );

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsDone(true);
  };
  const snoozeTask = (updatedTask) => {
    const snoozedTasks = tasks.map((task) =>
      task.name === updatedTask.name ? updatedTask : task
    );
    setTasks(snoozedTasks);
    setFilteredTasks(snoozedTasks);
    localStorage.setItem("tasks", JSON.stringify(snoozedTasks));
  };

  return (
    <TaskContext.Provider
      value={{
        setTasks,
        setFilteredTasks,
        tasks,
        selectedPriority,
        setSelectedPriority,
        addTask,
        deleteTask,
        editTask,
        priorityTask,
        filteredtasks,
        isPresent,
        setIsPresent,
        isAdded,
        setIsAdded,
        searchTask,
        sortTasks,
        isEdit,
        setIsEdit,
        isDone,
        setIsDone,
        isDarkMode,
        setIsDarkMode,
        statusUpdate,
        snoozeTask,
        isSnooze,
        setIsSnooze,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
