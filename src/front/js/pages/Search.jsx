import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Recipes from "../component/Recipes";
import SearchBar from "../component/SearchBar";
import Modal from "../component/Modal.jsx";

const Search = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="m-5">
      <Modal />
      <SearchBar />
      <Recipes />
    </div>
  );
};

export default Search;
