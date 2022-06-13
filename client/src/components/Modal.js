import React from "react";

const Modal = (props) => {
  return (
    <div className="modal">
      <p>Processing Your Request..</p>
      <span>{props.text} 🤑🤑</span>
    </div>
  );
};

export default Modal;
