import React, { useContext, useState, useCallback } from "react";
import "./Accordion.css";
import rightArrow from "../constants/images/right-arrow.svg";
import bottomArrow from "../constants/images/caret-down.svg";
import redCircle from "../constants/images/red-circle.svg";
import yellowCircle from "../constants/images/yellow-circle.svg";
import blueCircle from "../constants/images/blue-circle.svg";
import greenCircle from "../constants/images/green-circle.svg";
import TaskContext from "../Context/TaskContext";
import Modal from "./Modal";
import { addDays } from "date-fns";

const Accordion = React.memo(({ setEditTaskName, setIsEditTaskFormOpen }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalTaskName, SetModalTaskName] = useState("");

  const {
    filteredtasks,
    deleteTask,
    isPresent,
    setIsPresent,
    selectedPriority,
    isSnooze,
    setIsSnooze,
    snoozeTask,
  } = useContext(TaskContext);
  const handleEditTask = useCallback(
    (taskName) => {
      setIsEditTaskFormOpen(true);
      setEditTaskName(taskName);
    },
    [setIsEditTaskFormOpen, setEditTaskName]
  );

  const handleDeleteTask = useCallback(
    (task) => {
      deleteTask(task);
      setActiveIndex(null);
      setIsPresent(true);
      SetModalTaskName(task.name);
    },
    [deleteTask]
  );

  const closeDeleteModal = useCallback(() => {
    setIsPresent(false);
  }, [setIsPresent]);

  const closeSnoozeModal = useCallback(() => {
    setIsSnooze(false);
  }, [setIsSnooze]);
  const handleToggle = useCallback(
    (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    },
    [activeIndex]
  );

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day} ${month} ${year}-${hours}:${minutes} ${ampm}`;
  }, []);

  const handleSnoozeTask = useCallback(
    // I am snoozing 7 days here
    (task) => {
      const newDueDate = addDays(new Date(task.dueDate), 7);
      snoozeTask({ ...task, dueDate: newDueDate });
      SetModalTaskName(task.name);
      setIsSnooze(true);
    },
    [snoozeTask]
  );

  return (
    <>
      {filteredtasks.length !== 0 ? (
        filteredtasks.map((items, index) => (
          <React.Fragment key={items.name}>
            <div className="accordion-container">
              <div
                className="accordion-items"
                onClick={() => handleToggle(index)}
              >
                <div>
                  <p className="task-heading">
                    <span>
                      {activeIndex === index ? (
                        <img
                          className="arrow-image"
                          src={bottomArrow}
                          alt="Bottom-Arrow-Icon"
                        />
                      ) : (
                        <img
                          width={20}
                          height={15}
                          src={rightArrow}
                          alt="Right-Arrow-Icon"
                        />
                      )}
                    </span>
                    {items.name}
                  </p>
                  <p className="due-date-text">
                    Due Date: {formatDate(items.dueDate).split("-")[0]}
                  </p>
                </div>
              </div>
              <div>
                {items.status === "completed" ? (
                  <div className="priority-container">
                    <p className="task-heading">Done</p>
                    <img
                      className="priority-image"
                      src={greenCircle}
                      alt="High-Priority"
                    />
                  </div>
                ) : (
                  <div className="priority-container">
                    <p className="task-heading">{items.priority}</p>
                    {items.priority === "High" ? (
                      <img
                        className="priority-image"
                        src={redCircle}
                        alt="High-Priority"
                      />
                    ) : items.priority === "Medium" ? (
                      <img
                        className="priority-image"
                        src={yellowCircle}
                        alt="Medium-Priority"
                      />
                    ) : items.priority === "Low" ? (
                      <img
                        className="priority-image"
                        src={blueCircle}
                        alt="Low-Priority"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            {isPresent && (
              <Modal
                message={`Success! The task "${modalTaskName}" has been deleted`}
                onClose={closeDeleteModal}
              />
            )}
            {isSnooze && (
              <Modal
                message={`Success! The task "${modalTaskName}" has been snoozed for 7 Days`}
                onClose={closeSnoozeModal}
              />
            )}
            <div className="accordion-content-container">
              {activeIndex === index ? (
                <div className="accordion-content">
                  <p className="desc-date-heading">Description :</p>
                  <p className="desc-text">{items.description}</p>
                  <p className="desc-date-heading">Due Date :</p>
                  <p className="desc-text">{formatDate(items.dueDate)}</p>
                  <div className="task-edit-delete-snooze-button-container">
                    <button
                      className="task-edit-delete-buttons"
                      onClick={() => handleEditTask(items)}
                    >
                      Edit
                    </button>
                    <button
                      className="task-edit-delete-buttons"
                      onClick={() => handleDeleteTask(items)}
                    >
                      Delete
                    </button>
                    <button
                      className="task-snooze-button"
                      onClick={() => handleSnoozeTask(items)}
                    >
                      Snooze
                    </button>
                  </div>
                  <br />
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <div className="no-data-container">
            <h4>Oops! No Data Found</h4>
            <p>
              It looks like we don't have any data available for{" "}
              <b>{selectedPriority}</b> category right now. We're working on it,
              so please check back soon or explore other categories!
            </p>
          </div>
        </React.Fragment>
      )}
    </>
  );
});

export default Accordion;
