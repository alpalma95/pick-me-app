import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const AddFavorite = ({ setAddFavoriteShow, item }) => {
  const { store, actions } = useContext(Context);
  const [listValue, setListValue] = useState("breakfast");

  const setListValueHandler = (e) => {
    setListValue(e.target.value);
  };

  const setAddFavoriteShowHandler = () => {
    setAddFavoriteShow(false);
  };

  const idFromUri = item.recipe.uri.split("_")[1];

  const newFavorite = {
    recipe_id: idFromUri,
    recipe_url: item.recipe.url,
    recipe_title: item.recipe.label,
    category_name: listValue,
    recipe_image: item.recipe.image,
  };
  return (
    <div className="w-100 p-2">
      <h5 className="mt-3 mb-4">Select category:</h5>
      <select
        className="form-select mb-4"
        aria-label="Default select example"
        onChange={setListValueHandler}
      >
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
      <div className="d-flex justify-content-center gap-4">
        <button
          className="btn recipe__btn"
          onClick={() => {
            actions.addFavorite(newFavorite);
            actions.sendToDatabase(newFavorite);
            setAddFavoriteShowHandler();
          }}
        >
          Confirm
        </button>
        <button className="btn btn-danger" onClick={setAddFavoriteShowHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddFavorite;
