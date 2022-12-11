import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Pill = (props) => {
  const { store, actions } = useContext(Context);
  
  const [pillState, setPillState] = useState(false);
  const pillHandler = () => {
    setPillState((prevState) => {
      return !prevState;
    });
    actions.updatePillArr(props.diet.key);
  };

  return (
    <span
      className={`badge rounded-pill ${pillState ? "bg-success" : "bg-info"}`}
      onClick={pillHandler}
      style={{ cursor: "pointer" }}
    >
      {props.diet.name}
    </span>
  );
};

export default Pill;
