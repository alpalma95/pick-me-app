import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import logo_back from "../../../img/logo-back.png";
import "../../styles/form.css";

const Login = () => {
  const [emailValue, setEmailValue] = useState(``);
  const [passwordValue, setPasswordValue] = useState(``);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    <Navigate to="/" replace={true} />;
  }, [store.userToken]);

  const setEmailValueHandler = (e) => {
    setEmailValue(e.target.value);
    setShowEmail(true);
    e.target.placeholder = "";
  };

  const setPasswordValueHandler = (e) => {
    setPasswordValue(e.target.value);
    setShowPassword(true);
    e.target.placeholder = "";
  };

  const submitUserInfo = () => {
    if (emailValue && passwordValue) {
      actions.login(emailValue, passwordValue);
    }
    setEmailValue("");
    setPasswordValue("");
  };

  return !store.userToken ? (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${logo_back}`,
          backgroundSize: "80px",
          minHeight: "70vh",
        }}
      >
        <div className="form-custom">
          <h1>Login</h1>
          <label
            className={`${showEmail ? `bottomToTop` : `hidden`}`}
            htmlFor="email_input"
          >
            Email or username
          </label>
          <input
            type="text"
            placeholder="Email or username"
            id="email_input"
            value={emailValue}
            onChange={setEmailValueHandler}
          />

          <label
            className={`${showPassword ? `bottomToTop` : `hidden`}`}
            htmlFor="password_input"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={passwordValue}
            id="password_input"
            onChange={setPasswordValueHandler}
          />

          <button
            className="btn btn-outline-dark"
            type="submit"
            onClick={submitUserInfo}
          >
            Login
          </button>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default Login;
