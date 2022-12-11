import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/pillFavorite.css";

const PillFavorite = ({ categoryName, showHandler, show }) => {
  const { store, actions } = useContext(Context);
  const displayCategory =
    categoryName === "Breakfast"
      ? store.showBreakfast
      : categoryName === "Lunch"
      ? store.showLunch
      : categoryName === "Dinner"
      ? store.showDinner
      : categoryName === "Snack"
      ? store.showSnack
      : store.showAll;

  let favoriteCategory;
  if (categoryName !== "All") {
    favoriteCategory = store.favoriteItems.filter(
      (x) => x.category_name === categoryName.toLowerCase()
    );
  } else {
    favoriteCategory = [...store.favoriteItems];
  }

  return (
    <div
      className={`btn favorites-pill ${
        displayCategory
          ? "favorites-pill--selected"
          : "favorites-pill--unselected"
      } d-block d-flex justify-content-between`}
      onClick={() => {
        showHandler();
      }}
    >
      {categoryName}{" "}
      <span className=" favorites-pill__badge">{favoriteCategory.length}</span>
    </div>
  );
};

export default PillFavorite;
