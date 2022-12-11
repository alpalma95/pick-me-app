import React, { useEffect, useContext } from "react";
import FavoriteCategory from "../component/FavoriteCategory.jsx";
import { Context } from "../store/appContext.js";
import FavoritePillsSection from "../component/FavoritePillsSection.jsx";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.userToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mx-auto mt-3 pt-5" style={{ heigth: "100vh" }}>
      <div className="row">
        <div
          className="col-12 col-md-2 d-flex flex-sm-row flex-md-column"
          style={{ height: "95%" }}
        >
          <FavoritePillsSection />
        </div>
        <div
          className="col-12 col-md-10"
          style={{ height: "95vh", overflow: "scroll" }}
        >
          {store.favoriteItems.length == 0 ? (
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "700",
                color: "#18965f",
              }}
            >
              Nothing to see here yet!
            </h1>
          ) : (
            <>
              {store.showBreakfast ? (
                <FavoriteCategory categoryName="Breakfast" />
              ) : (
                <></>
              )}
              {store.showLunch ? (
                <FavoriteCategory categoryName="Lunch" />
              ) : (
                <></>
              )}
              {store.showDinner ? (
                <FavoriteCategory categoryName="Dinner" />
              ) : (
                <></>
              )}
              {store.showSnack ? (
                <FavoriteCategory categoryName="Snack" />
              ) : (
                <></>
              )}
              {store.showAll ? (
                <>
                  <FavoriteCategory categoryName="Breakfast" />
                  <FavoriteCategory categoryName="Lunch" />
                  <FavoriteCategory categoryName="Dinner" />
                  <FavoriteCategory categoryName="Snack" />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
