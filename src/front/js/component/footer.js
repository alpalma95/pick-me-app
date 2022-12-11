import React, { useRef } from "react";
import "../../styles/footer.css";
import logo from "../../../img/pick_me3.png";

export const Footer = () => {
  const email = useRef();
  const newsletterHandler = (e) => {
    e.preventDefault();
    alert("Thank you for being one of us!");
    e.target.reset();
  };
  return (
    <footer className="footer text-center text-white">
      <div className="row g-0">
        <div className="col-12 col-sm-4 company">
          <h5>Company</h5>
          <ul>
            <li>Our Story</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="col-12 col-sm-4">
          <img className="logo" src={logo} />
          <p className="social__title">Get social - Join us!</p>
          <div className="icons">
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
          </div>
        </div>

        <div className="col-12 col-sm-4 suscribe">
          <h5>Subscribe. Be inspired. Don't Waste</h5>
          <form onSubmit={newsletterHandler}>
            <input type="text" placeholder="Email Address" ref={email} />
            <input type="submit" value="Subscribe" />
          </form>
        </div>
      </div>
      <p style={{ color: "black", marginBottom: "0" }}>
        Made with <i className="fa fa-heart text-danger" /> by{" "}
        <a style={{ color: "white" }} href="https://github.com/Jules-11">
          @Jules-11
        </a>
        <span> & </span>
        <a style={{ color: "white" }} href="https://github.com/sardinhas12">
          @sardinhas12
        </a>
        <span> & </span>
        <a style={{ color: "white" }} href="https://github.com/alpalma95">
          @alpalma95
        </a>
      </p>
    </footer>
  );
};
