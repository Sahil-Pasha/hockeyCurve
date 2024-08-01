import React, { useCallback, useState } from "react";
import "./CustomSelect.css";
import bottomArrow from "../constants/images/caret-down.svg";
import high from "../constants/images/red-circle.svg";
import medium from "../constants/images/yellow-circle.svg";
import low from "../constants/images/blue-circle.svg";

const CustomSelect = React.memo(({ taskPriority, setTaskPriority }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleOptionClick = useCallback(
    (option) => {
      setTaskPriority(option.label);
      // setIsOpen(false);
    },
    [setTaskPriority]
  );

  const options = [
    { label: "High", image: high },
    { label: "Medium", image: medium },
    { label: "Low", image: low },
  ];

  return (
    <div>
      <div className="custom-select-header" onClick={toggleDropdown}>
        {isOpen ? <p>{taskPriority}</p> : <p>Select Priority</p>}
        <img src={bottomArrow} alt="arrow-icon" className="arrow-icon" />
      </div>
      {isOpen && (
        <>
          {options.map((option) => (
            <div
              key={option.label}
              className="custom-select-option"
              onClick={() => handleOptionClick(option)}
            >
              <p>{option.label}</p>
              <img width={20} src={option.image} alt={option.label} />
            </div>
          ))}
        </>
      )}
    </div>
  );
});

export default CustomSelect;
