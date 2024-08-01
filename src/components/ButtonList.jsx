import React, { useContext } from "react";
import "./ButtonList.css";
import TaskContext from "../Context/TaskContext";

const ButtonList = React.memo(() => {
  const buttons = ["All", "High", "Medium", "Low", "Done"];

  const { priorityTask, selectedPriority, setSelectedPriority } =
    useContext(TaskContext);

  const handlePriorities = (priority) => {
    setSelectedPriority(priority);
    priorityTask(priority);
  };
  return (
    <>
      {buttons.map((items, index) => (
        <button
          className={
            selectedPriority === items ? "selected-button" : "priority-buttons"
          }
          key={index}
          onClick={() => handlePriorities(items)}
        >
          {items}
        </button>
      ))}
    </>
  );
});

export default ButtonList;
