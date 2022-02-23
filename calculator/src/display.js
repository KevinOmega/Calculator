import React from "react";
import { useGlobalContext } from "./context";

const Display = () => {
  const { result, operation } = useGlobalContext();
  return (
    <div className="display-container">
      <div id="display">
        <p id="function">{operation}</p>
        <p id="result">{result}</p>
      </div>
    </div>
  );
};

export default Display;
