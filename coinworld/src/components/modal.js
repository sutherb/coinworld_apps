import React from 'react';

import '../styles/modal.scss';

const Modal = ({title, messageContent, buttonLabel, buttonAction}) => {

  const buttons = document.querySelectorAll(".toggle-button");
  const modal = document.querySelector(".modal");
  
  [].forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      modal.classList.toggle("off");
    })
  });


  return (
    <div className="modal">
      <h3>{title}</h3>
      <div className="content">
        {messageContent}
      </div>
      <button className="btn" type="button" aria-expanded="false" onClick={()=> buttonAction()}>{buttonLabel}</button>
    </div>
  );
}

export default Modal;