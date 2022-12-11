import React, { useContext, useEffect } from "react";
import FavoriteCard from "./FavoriteCard.jsx";
import { Context } from "../store/appContext";
import "../../styles/favoriteCategory.css";

const FavoriteCategory = ({ categoryName }) => {
  const { store, actions } = useContext(Context);
  const favoriteCategory = store.favoriteItems.filter(
    (x) => x.category_name === categoryName.toLowerCase()
  );

  return (
    <div>
      {favoriteCategory.length != 0 ? (
        <div className="container favorite-category">
          <h2 className="favorite-category__title">{categoryName}</h2>
          <div className="favorite-category__cards">
            {favoriteCategory.map((x, i) => (
              <FavoriteCard
                key={i}
                recipeUrl={x.recipe_url}
                recipeTitle={x.recipe_title}
                recipeId={x.recipe_id}
                imgUrl={x.recipe_image}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FavoriteCategory;
