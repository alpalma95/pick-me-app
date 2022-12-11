import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import UserIcon from "./UserIcon.jsx";
import logo from "../../../img/PM_logo.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const removeIngredientHandler = (e) => {
    const index = parseInt(e.target.parentNode.getAttribute("data-index"));
    actions.removeShoppingListByIndex(index);
    console.log("Delete ITEM", e);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light p-2 sticky-top d-flex justify-content-end navbar--custom">
      <div className="container-fluid">
        <Link
          to="/"
          className="me-auto navbar__btns__logo"
          style={{ textDecoration: "none" }}
        >
          <img className="logo" src={logo} />
          <span className="brand__logo">Pick Me</span>
        </Link>
        <button
          className="navbar-toggler navbar__btns"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="text-end m-1">
              <Link to="/search">
                <button
                  className="btn border-white m-1  w-100 navbar__btns "
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  <i className="bi bi-search fa-lg"></i>
                  <span style={{ padding: "10px" }}>Search</span>
                </button>
              </Link>
            </li>
            <li className="text-end m-1">
              {store.userToken ? (
                <Link to="/favorites">
                  <button
                    className="btn border-white m-1  w-100 navbar__btns"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    <i className="bi bi-star fa-lg"></i>
                    <span style={{ padding: "8px" }}>Favorites</span>
                  </button>
                </Link>
              ) : (
                <Link to="/signup">
                  <button
                    className="btn border-white m-1  w-100 navbar__btns navbar__signup"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Sign up
                  </button>
                </Link>
              )}
            </li>
            <li className="text-end m-1">
              {store.userToken ? (
                <Link to="/shoppinglist">
                  <button
                    className="btn border-white m-1  w-100 navbar__btns"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                    style={{
                      marginRight: "40px",
                      boxShadow: "none",
                    }}
                  >
                    <i className="fas fa-shopping-basket fa-lg"></i>
                    <span className="badge text-black">
                      {store.shoppingList.length}
                    </span>
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </li>
            <li className="text-end m-1">
              {store.userToken ? (
                <UserIcon />
              ) : (
                <Link to="/login">
                  <button
                    className="btn border-white m-1 w-100 navbar__btns"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
