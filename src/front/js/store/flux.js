const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      searchInput: ["mushrooms", "quinoa", "cheese"],
      pillDietInput: [],
      isLoaded: false,
      error: null,
      items: [],
      favoriteItems: [],
      shoppingList: [],
      userToken: sessionStorage.getItem("jwt-token") ?? null,
      userLogged: !sessionStorage.getItem("jwt-token") ? false : true,
      userEmail: null,
      userId: null,
      showBreakfast: false,
      showLunch: false,
      showDinner: false,
      showSnack: false,
      showAll: true,
      showModal: false,
      userUsername: null,
      userName: null,
    },
    actions: {
      searchInputHandler: (textSearch) => {
        setStore({ searchInput: textSearch });
      },
      searchAPI: () => {
        setStore({ isLoaded: false });
        const store = getStore();
        let search = store.searchInput;
        const diet = store.pillDietInput;
        if (search.length === 0) {
          search = ["mushrooms", "quinoa", "cheese"];
        }
        fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=e5010e00&app_key=0326e037783040d1e8513857ee63d982&q=${search}&healt=${diet}`
        )
          .then((response) => response.json())
          .then(
            (result) => {
              setStore({ items: result.hits });
              setTimeout(() => {
                setStore({ isLoaded: true });
              }, 2500);
            },
            (error) => {
              setStore({ isLoaded: true });
              setStore({ error: error });
            }
          );
      },

      addShoppingList: (ingredient) => {
        const store = getStore();
        ingredient["index"] = store.shoppingList.length;
        setStore({ shoppingList: [...store.shoppingList, ingredient] });
        console.log(JSON.stringify(store.shoppingList));
      },
      addShoppingListBE: (ingredient) => {
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/shopping/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(ingredient),
        }).then((resp) => {
          resp.json();
        });
      },
      fetchShoppingList: () => {
        const store = getStore();
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/shopping/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => resp.json())
          .then((data) => setStore({ shoppingList: data }))
          .catch((err) => alert("Something went wrong!" + err));
      },
      shoppingListLineToggle: (index) => {
        const store = getStore();
        let lineItem = store.shoppingList[index];
        lineItem.isChecked = !lineItem.isChecked;
        let items = store.shoppingList;
        items[index] = lineItem;
        setStore({ shoppingList: items });
      },

      clearShoppingList: () => {
        setStore({ shoppingList: [] });
      },
      clearShoppingListBE: () => {
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/shopping/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((resp) => {
          resp.json();
        });
      },
      removeShoppingList: (ingredient) => {
        const store = getStore();
        const list = store.shoppingList.filter((line) => {
          if (
            line.recipeUri === ingredient.recipeUri &&
            line.ingredientIndex === ingredient.ingredientIndex
          ) {
            return false;
          } else {
            return true;
          }
        });
        setStore({ shoppingList: list });
      },
      removeShoppingListByIndex: (index) => {
        const store = getStore();
        const list = store.shoppingList.filter((line, i) => {
          if (i === index) {
            return false;
          } else {
            return true;
          }
        });
        setStore({ shoppingList: list });
      },
      updatePillArr: (dietPlan) => {
        const store = getStore();
        const element = store.pillDietInput.find((elem) => {
          return elem === dietPlan;
        });
        if (element === undefined) {
          setStore({ pillDietInput: [...store.pillDietInput, dietPlan] });
        } else {
          const newArr = store.pillDietInput.filter((elem) => {
            if (elem === dietPlan) {
              return false;
            } else {
              return true;
            }
          });
          setStore({ pillDietInput: newArr });
        }
      },
      clearPillArr: () => {
        setStore({ pillDietInput: [] });
      },
      login: (email, password) => {
        fetch(`${process.env.BACKEND_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem("jwt-token", data.token);
            setStore({ userToken: sessionStorage.getItem("jwt-token") });
          })
          .catch((err) => alert("Invalid credentials!"));
      },
      getToken: () => {
        setStore({
          userToken: sessionStorage.getItem("jwt-token") ?? null,
        });
      },
      addFavorite: (newItem) => {
        const store = getStore();
        setStore({ favoriteItems: [...store.favoriteItems, newItem] });
      },
      sendToDatabase: (favorite) => {
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/favorites/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(favorite),
        }).then((resp) => {
          resp.json();
        });
      },
      deleteFavorite: (e) => {
        const store = getStore();

        const newFavsArray = store.favoriteItems.filter(
          (x) => x.recipe_id != e.target.id
        );
        setStore({ favoriteItems: newFavsArray });
      },
      deleteFavoriteDatabase: (e) => {
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/favorites/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            recipe_id: e.target.id,
          }),
        }).then((resp) => {
          resp.json();
        });
      },
      fetchFavorites: () => {
        const store = getStore();
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/favorites/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => resp.json())
          .then((data) => setStore({ favoriteItems: data }))
          .catch((err) => alert("Something went wrong!" + err));
      },
      showBreakfastHandler: () => {
        const store = getStore();
        setStore({ showBreakfast: !store.showBreakfast, showAll: false });
        if (
          !store.showBreakfast &&
          !store.showLunch &&
          !store.showDinner &&
          !store.showSnack &&
          !store.showAll
        )
          setStore({ showAll: true });
      },
      showLunchHandler: () => {
        const store = getStore();
        setStore({ showLunch: !store.showLunch, showAll: false });
        if (
          !store.showBreakfast &&
          !store.showLunch &&
          !store.showDinner &&
          !store.showSnack &&
          !store.showAll
        )
          setStore({ showAll: true });
      },
      showDinnerHandler: () => {
        const store = getStore();
        setStore({ showDinner: !store.showDinner, showAll: false });
        if (
          !store.showBreakfast &&
          !store.showLunch &&
          !store.showDinner &&
          !store.showSnack &&
          !store.showAll
        )
          setStore({ showAll: true });
      },
      showSnackHandler: () => {
        const store = getStore();
        setStore({ showSnack: !store.showSnack, showAll: false });
        if (
          !store.showBreakfast &&
          !store.showLunch &&
          !store.showDinner &&
          !store.showSnack &&
          !store.showAll
        )
          setStore({ showAll: true });
      },
      showAllHandler: () => {
        const store = getStore();
        if (!store.showAll)
          setStore({
            showBreakfast: false,
            showLunch: false,
            showDinner: false,
            showSnack: false,
            showAll: true,
          });
      },
      showModalHandler: () => {
        const store = getStore();

        setStore({ showModal: !store.showModal });
        store.showModal
          ? document
              .getElementsByTagName("body")[0]
              .classList.add("body--modal-open")
          : document
              .getElementsByTagName("body")[0]
              .classList.remove("body--modal-open");
      },
      getUserDetails: () => {
        const store = getStore();
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/user/info`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ userName: data.name, userUsername: data.username });
            console.log(store.userName, store.userUsername);
          })
          .catch((err) => alert("Something went wrong!" + err));
      },
      setUserName: (name) => {
        const token = sessionStorage.getItem("jwt-token");
        fetch(`${process.env.BACKEND_URL}/api/user/name`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ name: name }),
        }).then((resp) => resp.json());
      },
      setUserNameStore: (name) => {
        const store = getStore();
        setStore({ userName: name });
      },
      setUserUsernameStore: (username) => {
        const store = getStore();
        setStore({ userUsername: username });
      },
      clearUserNameStore: () => {
        setStore({ userName: null });
      },
      clearUserUsernameStore: () => {
        setStore({ userUsername: null });
      },
      resetStore: () => {
        const store = getStore();
        setStore({
          searchInput: ["mushrooms", "quinoa", "cheese"],
          pillDietInput: [],
          isLoaded: false,
          error: null,
          items: [],
          favoriteItems: [],
          shoppingList: [],
          userToken: sessionStorage.getItem("jwt-token") ?? null,
          userLogged: !sessionStorage.getItem("jwt-token") ? false : true,
          userEmail: null,
          userId: null,
          showBreakfast: false,
          showLunch: false,
          showDinner: false,
          showSnack: false,
          showAll: true,
          showModal: false,
          userUsername: null,
          userName: null,
        });
      },
    },
  };
};

export default getState;
