import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/modal.css";

const Modal = () => {
  const { store, actions } = useContext(Context);

  return (
    <div
      className={`overlay-custom ${store.showModal ? `grid-custom` : `hidden`}`}
    >
      <div className="modal-custom">
        <span className="modal__close-btn" onClick={actions.showModalHandler}>
          <i className="fas fa-times"></i>{" "}
        </span>
        <h3 className="modal-custom__h3">
          Sign up or login for adding favorites!
        </h3>
        <div className="modal-custom__btns">
          <Link
            onClick={actions.showModalHandler}
            to="/login"
            className="btn-custom"
          >
            Login
          </Link>
          <Link
            onClick={actions.showModalHandler}
            to="/signup"
            className="btn-custom"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
