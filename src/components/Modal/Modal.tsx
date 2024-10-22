import React from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }: any) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <h1>heelo</h1>
        </div>
      </div>
    </>
  );
};

export default Modal;
