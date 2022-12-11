import React from "react";
import { useEffect, useRef } from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import greenImage from "../../../img/green_1.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  const carouselText = [
    { text: "mushroom, quinoa, cheese" },
    { text: "chicken, spinach" },
    { text: "rice" },
  ];

  useEffect(() => {
    const getCarousel = async () => {
      await carousel(carouselText);
    };
    getCarousel();
  }, []);

  async function typeSentence(sentence, delay = 150) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      await waitForMs(delay);
      textRef.current.innerHTML += letters[i];
      i++;
    }
    return;
  }

  async function deleteSentence() {
    const sentence = textRef.current.innerHTML;
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      textRef.current.innerHTML = letters.join("");
    }
  }

  async function carousel(carouselList) {
    var i = 0;
    while (true) {
      await typeSentence(carouselList[i].text);
      await waitForMs(1500);
      await deleteSentence();
      await waitForMs(500);
      i++;
      if (i >= carouselList.length) {
        i = 0;
      }
    }
  }

  function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const styles = {
    backgroundImage: `url(${greenImage})`,

    //backgroundImage: `linear-gradient(to right bottom, rgba(252, 91, 91, 0.8), rgba(40, 180, 133, 0.8)), url(${imagem2Image})`,

    backgroundSize: "cover",
    backgroundPosition: "top",
    //clipPath: "polygon(0 0, 100% 0, 100% 80vh, 0 100%)",
  };

  return (
    <div className="landing">
      <div className="image" style={styles}>
        <div className="box">
          <div className="caixa">
            <h1 className="maintitle"> Pick Me</h1>
            <h5 className="subtitle">
              - The fridge is where the magic happens -
            </h5>
            <div className="typing-demonstration">
              <h5 className="title">Type ingredients you have</h5>
              <div className="typing-container">
                <span id="sentence" className="sentence">
                  <i className="bi bi-search t-dark"></i>
                </span>
                <span ref={textRef} id="feature-text"></span>
                <span className="input-cursor"></span>
              </div>
              <button className="try" onClick={() => navigate("/search")}>
                Try it out!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="landing__container">
        <div className="landing__card">
          <div className="landind__card__img">
            <img src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/000000/external-vegetable-healthy-lifestyle-icongeek26-outline-icongeek26.png" />
          </div>
          <h5 className="">Your Ingredients</h5>
          <p className="">
            Use ingredients you already have on hand. Avoid food waste.
          </p>
        </div>
        <div className="landing__card">
          <div className="landind__card__img">
            <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-recipe-kitchen-cooking-becris-lineal-becris.png" />
          </div>
          <h5 className="">Find Recipes</h5>
          <p className="">
            Find and select the recipes you want to try. Save them to your
            library.
          </p>
        </div>
        <div className="landing__card">
          <div className="landind__card__img">
            <img src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-eco-food-ecology-tulpahn-detailed-outline-tulpahn.png" />
          </div>
          <h5 className="">Enjoy Cooking</h5>
          <p className="">
            Discover the recipes and make your family delicious meals.
          </p>
        </div>
      </div>

      {/* <div className="layout section-cards">
        <h2 className="title2"> How it works</h2>

        <div className="container-cards-custom">
          <div className="cards-custom">
            <span className="icon1">
              <img src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/000000/external-vegetable-healthy-lifestyle-icongeek26-outline-icongeek26.png" />
            </span>
            <div className="p1">
              <h3 className="text1"> Your Ingredients</h3>
              <p className="text2">
                Use ingredients you already have on hand. Avoid food waste
              </p>
            </div>
          </div>

          <div className="cards-custom">
            <span className="icon2">
              <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-recipe-kitchen-cooking-becris-lineal-becris.png" />
            </span>
            <div className="p1">
              <h3 className="text1">Find Recipes</h3>
              <p className="text2">
                Find and select the recipes you want to try.Save them to your
                library{" "}
              </p>
            </div>
          </div>

          <div className="cards-custom">
            <span className="icon3">
              <img src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-eco-food-ecology-tulpahn-detailed-outline-tulpahn.png" />
            </span>
            <div className="p1">
              <h3 className="text1">Enjoy Cooking!</h3>
              <p className="text2">
                Discover the recipes and make your family delicious meals
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
