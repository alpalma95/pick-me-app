import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/favoriteCard.css";

const FavoriteCard = ({ recipeUrl, recipeTitle, recipeId, imgUrl }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="favorites__card">
      <h5 className="favorites__card__title">{recipeTitle}</h5>

      <img src={imgUrl} className="card-img-top" alt={recipeTitle} />

      <div className="card-body">
        <div className="d-flex">
          <span
            style={{
              fontSize: "30px",
              color: "var(--dark-red)",
              cursor: "pointer",
            }}
          >
            <i
              id={recipeId}
              onClick={(e) => {
                actions.deleteFavorite(e);
                actions.deleteFavoriteDatabase(e);
              }}
              className="fas fa-times d-inline-block"
            ></i>
          </span>

          <button type="button" className="favorites__card__btn">
            <a
              href={recipeUrl}
              target="_blank"
              className="card-link text-white"
            >
              Full Recipe!
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
