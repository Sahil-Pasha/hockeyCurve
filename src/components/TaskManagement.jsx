import React, { useState, useEffect, useCallback, useContext } from "react";
import "./TaskManagement.css";
import "./DarkMode.css";
import Accordion from "./Accordion";
import ButtonList from "./ButtonList";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import TaskContext from "../Context/TaskContext";
import darkModeIcon from "../utils/images/dark-mode.svg";
import lightModeIcon from "../utils/images/light-mode.svg";

const TaskManagement = React.memo(() => {
  // For Add Tasks
  const [isAddTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // For Edit Tasks
  const [isEditTaskFormOpen, setIsEditTaskFormOpen] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");

  // For search Tasks
  const [searchQuery, setSearchQuery] = useState("");

  //For Sort by priority and dueDate
  const [sortOption, setSortOption] = useState();

  // For not selecting the back date
  const [minDateTime, setMinDateTime] = useState();

  const {
    searchTask,
    sortTasks,
    setTasks,
    setFilteredTasks,
    isDarkMode,
    setIsDarkMode,
  } = useContext(TaskContext);

  const handleOpenForm = useCallback(() => {
    setIsTaskFormOpen(true);
  }, []);

  const handleViewTask = useCallback(() => {
    setIsTaskFormOpen(false);
    setIsEditTaskFormOpen(false);

    //Resetting the sort priority
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks));
    }

    //Clear the searchQuery and sortOptions
    setSearchQuery("");
    setSortOption("");
  }, []);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setMinDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, [isAddTaskFormOpen]);

  useEffect(() => {
    searchTask(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    sortTasks(sortOption);
  }, [sortOption]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`main-div ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="list-view">
        <p className="list-view-heading" onClick={handleViewTask}>
          Task List View
        </p>
        {!isEditTaskFormOpen && !isAddTaskFormOpen && (
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              placeholder="Type to search tasks..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {!isEditTaskFormOpen && !isAddTaskFormOpen && (
          <div className="sort-conainter">
            <p className="sort-heading">Sort By</p>
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Select</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        )}

        <div className="dark-light-mode-container" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <img src={lightModeIcon} alt="dark-mode" />
          ) : (
            <img src={darkModeIcon} alt="light-mode" />
          )}
          <button className="light-dark-mode-button">
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>

        {!isEditTaskFormOpen && !isAddTaskFormOpen && (
          <button className="list-view-heading" onClick={handleOpenForm}>
            + Add New task
          </button>
        )}
      </div>
      {isAddTaskFormOpen ? (
        <AddTask minDateTime={minDateTime} handleViewTask={handleViewTask} />
      ) : isEditTaskFormOpen ? (
        <EditTask
          minDateTime={minDateTime}
          task={editTaskName}
          handleViewTask={handleViewTask}
        />
      ) : (
        <div className="tasks-container">
          <div className="priority-buttons-container">
            <ButtonList />
          </div>
          <div>
            <Accordion
              setEditTaskName={setEditTaskName}
              setIsEditTaskFormOpen={setIsEditTaskFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskManagement;
