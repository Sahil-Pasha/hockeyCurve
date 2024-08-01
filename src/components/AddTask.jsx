import React, { useCallback, useContext, useState } from "react";
import CustomSelect from "./CustomSelect";
import TaskContext from "../Context/TaskContext";
import Modal from "./Modal";

const AddTask = React.memo(({ minDateTime, handleViewTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const { addTask, isPresent, setIsPresent, isAdded, setIsAdded } =
    useContext(TaskContext);

  const handleAddTaskForm = useCallback(
    (event) => {
      event.preventDefault();
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
        status: "active", // Default status
      };
      addTask(newTask);
    },
    [taskName, taskDescription, taskDueDate, taskPriority, addTask]
  );
  const closePresentModal = useCallback(() => {
    setIsPresent(false);
  }, [setIsPresent]);

  const closeAddedModal = useCallback(() => {
    setIsAdded(false);
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskPriority("");
  }, [setIsAdded]);

  return (
    <div className="add-task-form-container">
      {isPresent && (
        <Modal
          onClose={closePresentModal}
          message={`The task "${taskName}" already exists in your list. Please use a unique title.`}
        />
      )}
      {isAdded && (
        <Modal
          message={`Success! The task "${taskName}" has been added to your list. Click on the Task View List to see the updated List`}
          onClose={closeAddedModal}
        />
      )}
      <div className="add-task-form-heading-container">
        <p className="add-task-form-heading">Add New Task</p>
        <button
          className="add-task-form-delete-button"
          onClick={handleViewTask}
        >
          {/* Not able to understand the functionality for this Delete button because there is nothing to delete
              here, Here we are just opening the Add form so we do not have anything to delete here that is why
              I am adding the functionality to back to the home page */}
          Delete
        </button>
      </div>
      <div className="form-conatiner">
        <form onSubmit={handleAddTaskForm}>
          <div>
            <input
              className="input-field"
              type="text"
              placeholder="Task Name..."
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-field"
              type="text"
              required
              placeholder="Task Description..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-field"
              type="datetime-local"
              required
              min={minDateTime}
              placeholder="Select date and time"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
          </div>
          <div className="input-field">
            <CustomSelect
              taskPriority={taskPriority}
              setTaskPriority={setTaskPriority}
            />
          </div>
          <div className="task-add-cancel-button-container">
            <button type="submit" className="task-add-cancel-buttons">
              Add Task
            </button>
            <button
              type="cancel"
              className="task-add-cancel-buttons"
              onClick={handleViewTask}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddTask;
