import React from "react";
import Buttons from "./buttons";
import Display from "./display";

const Calculator = () => {
  return (
    <div className="container">
      <Display />
      <Buttons />
    </div>
  );
};

export default Calculator;
