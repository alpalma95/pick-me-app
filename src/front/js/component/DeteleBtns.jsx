import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const DeleteBtns = ({ setShowDelete }) => {
  const [deleteHeader, setDeleteHeader] = useState("Are you sure? 🤔");

  const { store, actions } = useContext(Context);
  const removeTokenHandler = () => {
    setDeleteHeader("Sad to see you go! You'll be automatically redirected 😊");

    setTimeout(() => {
      sessionStorage.removeItem("jwt-token");
      actions.getToken();
      actions.resetStore();
    }, 3000);
  };
  const deleteAllFavorites = () => {
    const token = sessionStorage.getItem("jwt-token");
    fetch(`${process.env.BACKEND_URL}/api/favorites/deleteall`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((resp) => {
      resp.json();
    });
  };
  const deleteUser = () => {
    deleteAllFavorites();
    actions.clearShoppingListBE();

    const token = sessionStorage.getItem("jwt-token");
    fetch(`${process.env.BACKEND_URL}/api/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      removeTokenHandler();
    });
  };

  const setShowDeleteHandler = () => {
    setDeleteHeader("Awesome! Thank you for your trust 🥰");
    setTimeout(() => {
      setShowDelete(false);
    }, 2000);
  };
  return (
    <>
      {store.userToken ? (
        <>
          <h3 className="settings__h3">
            <strong>{deleteHeader}</strong>
          </h3>
          <div className="settings__delete-section">
            <button
              className="settings__delete-btn"
              onClick={() => deleteUser()}
            >
              Yes, delete
            </button>
            <button
              className="settings__cancel-btn"
              onClick={setShowDeleteHandler}
            >
              No, keep my account
            </button>
          </div>
        </>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default DeleteBtns;
