import React, { useContext, useState, useEffect, useReducer } from "react";
import { Context } from "../store/appContext";
import AddFavorite from "./AddFavorite.jsx";
import "../../styles/card.css";

const RecipeCard = ({ item, index }) => {
  const { store, actions } = useContext(Context);
  const [addFavoriteShow, setAddFavoriteShow] = useState(false);
  const idFromUri = item.recipe.uri.split("_")[1];

  const [starFav, setStarFav] = useState(
    store.favoriteItems.some((x) => x.recipe_id == idFromUri)
  );

  useEffect(() => {
    if (!store.favoriteItems.find((x) => x.recipe_id == idFromUri)) {
      setStarFav(false);
    } else {
      setStarFav(true);
    }
  }, [store.favoriteItems]);

  const nutrientsArr = ["CA", "CHOLE", "FAT", "FIBTG", "SUGAR", "NA", "FE"];
  const checkBoxHandler = (e) => {
    console.log("tick", e);
    if (e.target.checked) {
      const ingredient = {
        recipeLabel: e.target.getAttribute("data-recipe-label"),
        ingredientIndex: e.target.getAttribute("data-recipe-ingredient-index"),
        ingredientText: e.target.getAttribute("data-recipe-ingredient-text"),
        recipeUri: e.target.getAttribute("data-recipe-uri"),
        quantity: e.target.getAttribute("data-recipe-ingredient-quantity"),
        food: e.target.getAttribute("data-recipe-ingredient-food"),
        measure: e.target.getAttribute("data-recipe-ingredient-measure"),
        weight: e.target.getAttribute("data-recipe-ingredient-weight"),
        foodCategory: e.target.getAttribute(
          "data-recipe-ingredient-foodcategory"
        ),
        isChecked: false,
      };

      actions.addShoppingList(ingredient);
      actions.addShoppingListBE(ingredient);
    } else {
      const ingredient = {
        ingredientIndex: e.target.getAttribute("data-recipe-ingredient-index"),
        ingredientText: e.target.getAttribute("data-recipe-ingredient-text"),
        recipeUri: e.target.getAttribute("data-recipe-uri"),
      };

      actions.removeShoppingList(ingredient);
      console.log(store.shoppingList);
    }
  };

  const addToShopList = () => {
    console.log("adding");
  };

  const addToFavoriteHandler = (e) => {
    if (starFav) {
      actions.deleteFavorite(e);
      actions.deleteFavoriteDatabase(e);
    } else if (!starFav && store.userToken) {
      setAddFavoriteShow(true);
    } else if (!store.userToken) {
      actions.showModalHandler();
    }
  };
  let star = starFav ? (
    <i
      id={idFromUri}
      className="bi bi-star-fill"
      style={{ cursor: "pointer" }}
    ></i>
  ) : (
    <i className="bi bi-star" style={{ cursor: "pointer" }}></i>
  );

  const cardContent = (
    <>
      <img
        src={item.recipe.image}
        alt={item.recipe.label}
        className="img__card"
      />
      <div className="card-body">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed p-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#nutrientsRecipe" + index}
              aria-expanded="false"
              aria-controls={"nutrientsRecipe" + index}
            >
              <h5 className="fs-5">Nutrients</h5>
            </button>
          </h2>
          <div
            id={"nutrientsRecipe" + index}
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul>
                {nutrientsArr.map((nut, index) => {
                  return (
                    <li className="nutrients-list" key={index}>
                      {item.recipe.totalNutrients[nut].label +
                        ": " +
                        item.recipe.totalNutrients[nut].quantity.toFixed(0) +
                        " " +
                        item.recipe.totalNutrients[nut].unit}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div className="">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed p-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#ingredientsRecipe" + index}
                aria-expanded="false"
                aria-controls={"ingredientsRecipe" + index}
              >
                <h5 className="fs-5">Ingredients</h5>
              </button>
            </h2>
            <div
              id={"ingredientsRecipe" + index}
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div
                className="accordion-body small text-start p-0"
                style={{ maxHeight: "200px", overflowY: "scroll" }}
              >
                {item.recipe.ingredients.map((ing, index) => (
                  <div
                    className="custom-control custom-checkbox list-group-item"
                    key={index}
                  >
                    <label
                      className="custom-control-label"
                      htmlFor={`${item.recipe.uri}${index}`}
                    >
                      {ing.text}
                    </label>
                    <div className="d-flex justify-content-end">
                      {store.userToken && (
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`${item.recipe.uri}${index}`}
                          onClick={checkBoxHandler}
                          data-recipe-label={item.recipe.label}
                          data-recipe-uri={item.recipe.uri}
                          data-recipe-ingredient-index={index}
                          data-recipe-ingredient-text={ing.text}
                          data-recipe-ingredient-quantity={ing.quantity}
                          data-recipe-ingredient-food={ing.food}
                          data-recipe-ingredient-measure={ing.measure}
                          data-recipe-ingredient-weight={ing.weight}
                          data-recipe-ingredient-foodcategory={ing.foodCategory}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body d-flex justify-content-between pb-0">
          <span
            onClick={(e) => addToFavoriteHandler(e)}
            style={{ fontSize: "30px", color: "rgb(255, 211, 0)" }}
          >
            {star}
          </span>
          <button type="button" className="btn search-btn recipe__btn">
            <a href={item.recipe.url} target="_blank">
              Go to recipe &rarr;
            </a>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="col-12 col-sm-4 col-xl-3 g-4 recipe-card__container">
      <div className="card recipe__card" style={{ minHeight: "587px" }}>
        <div
          style={{
            paddingTop: "10px",
            height: "90px",
          }}
        >
          <h5 className="card-title text-center">{item.recipe.label} </h5>
        </div>
        {addFavoriteShow ? (
          <>
            <img src={item.recipe.image} alt={item.recipe.label} />
            <AddFavorite setAddFavoriteShow={setAddFavoriteShow} item={item} />
          </>
        ) : (
          cardContent
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
