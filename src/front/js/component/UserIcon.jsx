import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userIcon.css";

const UserIcon = (props) => {
  const { store, actions } = useContext(Context);
  const removeTokenHandler = () => {
    sessionStorage.removeItem("jwt-token");
    actions.getToken();
    actions.resetStore();
  };

  return (
    <div className="dropdown ">
      <button
        type="button"
        className="btn border-white m-1 text-black w-100 dropdown-toggle navbar__btns"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <i className="far fa-user fa-lg"></i>
      </button>
      <ul className="list-group-flush dropdown-menu dropdown-menu-end">
        {store.userName ? (
          <li className="dropdown-item">
            <strong>Hi, {store.userName}!</strong>
          </li>
        ) : (
          <></>
        )}
        <li>
          <Link to="/settings" className="settings-btn">
            <span
              className="dropdown-item"
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
            >
              <i className="fas fa-cog"></i> Settings
            </span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link to="/" className="logout-btn">
            <span
              className="dropdown-item"
              onClick={removeTokenHandler}
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
            >
              <i className="fas fa-sign-out-alt"></i> Log out
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserIcon;
