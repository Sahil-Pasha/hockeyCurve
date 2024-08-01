import React, { useContext, useState, useCallback } from "react";
import TaskContext from "../Context/TaskContext";
import CustomSelect from "./CustomSelect";
import Modal from "./Modal";

const EditTask = React.memo(({ task, minDateTime, handleViewTask }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskId, setTaskId] = useState(task.id);

  const {
    editTask,
    isPresent,
    setIsPresent,
    isEdit,
    setIsEdit,
    isDone,
    setIsDone,
    statusUpdate,
  } = useContext(TaskContext);

  const handleEditTaskForm = useCallback(
    (event) => {
      event.preventDefault();
      const updatedTask = {
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
        id: taskId,
        status: task.status, // Default status
      };
      editTask(updatedTask);
    },
    [
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskId,
      task.status,
      editTask,
    ]
  );

  const handleDone = useCallback(() => {
    const completedTask = {
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      id: taskId,
      status: task.status, // Default status
    };
    statusUpdate(completedTask);
  }, [
    taskName,
    taskDescription,
    taskDueDate,
    taskPriority,
    taskId,
    task.status,
    editTask,
  ]);

  const closePresentModal = useCallback(() => {
    setIsPresent(false);
  }, [setIsPresent]);

  const closeEditModal = useCallback(() => {
    setIsEdit(false);
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskPriority("");
  }, [setIsEdit]);

  const closeDoneModal = useCallback(() => {
    setIsDone(false);
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskPriority("");
  }, [setIsDone]);

  return (
    <div className="add-task-form-container">
      {isPresent && (
        <Modal
          onClose={closePresentModal}
          message={`The task "${taskName}" already exists in your list. Please use a unique title.`}
        />
      )}
      {isEdit && (
        <Modal
          message={`Success! The task "${taskName}" has been Updated to your list. Click on the Task View List to see the updated List`}
          onClose={closeEditModal}
        />
      )}
      {isDone && (
        <Modal
          message={`Success! The task "${taskName}" has been marked as completed. Check the Task View List to see the updated status.`}
          onClose={closeDoneModal}
        />
      )}
      <div className="add-task-form-heading-container">
        <p className="add-task-form-heading">Edit Task</p>
        <button
          className="add-task-form-delete-button"
          onClick={handleViewTask}
        >
          {/* Not able to understand the functionality for this Delete button because  if user want to delete than why
              user will click on the edit button if user already have delete button on main page that is why
              I am adding the functionality to back to the home page */}
          Delete
        </button>
      </div>
      <div className="form-conatiner">
        <form onSubmit={handleEditTaskForm}>
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
          <div className="task-Edit-done-button-container">
            <button type="submit" className="task-Edit-done-buttons">
              Save Changes
            </button>
            <button
              type="button"
              className="task-Edit-done-buttons"
              onClick={handleDone}
            >
              Mark as Done
            </button>
          </div>
          <div className="EditCancel-button-conatiner">
            <button className="EditCancel-button" onClick={handleViewTask}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditTask;
