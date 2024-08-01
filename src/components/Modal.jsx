import React from "react";
import "./Modal.css";

const Modal = React.memo(({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
});

export default Modal;
