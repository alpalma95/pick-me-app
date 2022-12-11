import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoppingList.css";
import greenImage from "../../../img/green_1.jpg";
import logo_back from "../../../img/logo-back.png";
import logo from "../../../img/PM_logo.png";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.userToken) {
      navigate("/");
    }
  }, []);

  const linethroughHandler = (e) => {
    console.log("LINETHROUGH!!!", e.target.getAttribute("data-index"));
    actions.shoppingListLineToggle(e.target.getAttribute("data-index"));
  };

  const clearHandler = (e) => {
    actions.clearShoppingList();
    actions.clearShoppingListBE();
    navigate("/");
  };

  let oldRecipeLabel = "";
  const shoppingListItem = store.shoppingList
    .sort((a, b) => {
      if (a.recipeLabel.toUpperCase() < b.recipeLabel.toUpperCase()) {
        return -1;
      } else {
        return 1;
      }
    })
    .map((item, index) => {
      const ing = (
        <div
          className={
            item.isChecked
              ? "shopping__recipe__ingredient line-through"
              : "shopping__recipe__ingredient"
          }
          key={index}
          onClick={linethroughHandler}
          data-index={index}
        >
          {`
${
  item.quantity == 0
    ? ""
    : item.quantity % 1 == 0
    ? Number(item.quantity).toFixed(0)
    : Number(item.quantity).toFixed(1)
} ${!item.measure || item.measure[0] == "<" ? "" : item.measure} ${item.food}
`}
        </div>
      );
      const recipeTitle = oldRecipeLabel !== item.recipeLabel && (
        <div className="shopping__recipe__label">{item.recipeLabel}</div>
      );
      oldRecipeLabel = item.recipeLabel;
      return (
        <>
          {recipeTitle}
          {ing}
        </>
      );
    });

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${logo_back}`,
        backgroundSize: "80px",
        minHeight: "75vh",
      }}
    >
      <div className="shopping__list">
        <div style={{ textAlign: "center" }}>
          {/* <img className="logo" src={logo} /> */}
          <h4 className="list__title">- Shopping List -</h4>
        </div>

        <div className="row h-75">{shoppingListItem}</div>

        <button
          className="btn btn-danger d-block m-auto mt-4"
          onClick={clearHandler}
        >
          Clear!
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;

// https://papik.pro/en/uploads/posts/2022-06/1654814258_27-papik-pro-p-cute-drawing-on-the-phone-wallpaper-28.jpg
// ROSE COLOR PICKER #cf529f
