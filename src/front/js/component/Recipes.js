import React, { useState, useEffect, useContext } from "react";
import RecipeCard from "./RecipeCard";
import { Context } from "../store/appContext";
import Frying_Pan from "../../../assets/gif/frying-pan.gif";

const Recipes = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.searchAPI(store.searchInput);
  }, [store.searchInput]);

  if (store.error) {
    return <>{store.error.message}</>;
  } else if (!store.isLoaded || store.items.length === 0) {
    return (
      <>
        <img
          src={Frying_Pan}
          style={{
            margin: "0 auto",
            display: "block",
            width: "min(100%, 450px)",
          }}
        />
      </>
    );
  } else if (store.items.length != 0) {
    return (
      <div className="row">
        {store.items.map((item, index) => (
          <RecipeCard item={item} key={item.recipe.uri} index={index} />
        ))}
      </div>
    );
  }
};

export default Recipes;
