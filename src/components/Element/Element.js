import React from "react";
import './element.css'

export const Element = ({ picture, id, setModal, modalContent }) => {
  return (
    <div className="container">
      <img className="container_img"
        src={picture}
        onClick={() => {
          modalContent(id);
          setModal(true);
        }}
      ></img>
    </div>
  );
};
