import React, { useContext, useEffect } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ShoppingList from "./component/ShoppingList";
import Search from "./pages/Search.jsx";
import Favorites from "./pages/Favorites.jsx";
import UserSettings from "./pages/UserSettings.jsx";

const Layout = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (!store.userToken) return;

    actions.fetchFavorites();
    actions.fetchShoppingList();
    actions.getUserDetails();
  }, [store.userToken]);

  const basename = process.env.BASENAME || "";

  return (
    <div className={`layout ${store.showModal ? "body--modal-open" : ""}`}>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} exact path="/" />
            <Route element={<Signup />} exact path="/signup" />
            <Route element={<Login />} exact path="/login" />
            <Route element={<ShoppingList />} exact path="/shoppinglist" />
            <Route element={<Search />} exact path="/search" />
            <Route element={<Favorites />} exact path="/favorites" />
            <Route element={<UserSettings />} exact path="/settings" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
