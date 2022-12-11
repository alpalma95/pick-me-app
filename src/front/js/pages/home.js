import React, { useContext } from "react";
import "../../styles/home.css";
import LandingPage from "./LandingPage.jsx";
import { Context } from "../store/appContext";
import Search from "./Search.jsx";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return <div>{store.userToken ? <Search /> : <LandingPage />}</div>;
};
