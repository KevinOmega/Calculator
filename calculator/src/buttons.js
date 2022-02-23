import React, { useEffect, useState } from "react";
import { btns } from "./btns";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { result, operation, setOperation, setResult } = useGlobalContext();
  const [check, setCheck] = useState(false);

  const checkOperation = () => {
    const regex = /^\D/;
    const value = operation.replace(regex, "");
    const duplicateRegex = /[\D]([\D])/;
    setOperation(value.replace(duplicateRegex, "$1"));
    setResult(result.replace(duplicateRegex, "$1"));
  };

  const clickNumber = (n) => {
    const number = n.toString();
    if (result == 0 || !/[\d]/.test(result)) {
      setResult(number);
    } else {
      setResult(result.concat(number));
    }
    setOperation(operation.concat(number));
    setCheck(!check);
  };

  const Calculate = (numbers, symbols) => {
    if (numbers.length > 1) {
      let indexSymbol = symbols.indexOf(
        symbols.find((item) => item === "X" || item === "/")
      );
      if (indexSymbol === -1) {
        indexSymbol = symbols.indexOf(
          symbols.find((item) => item === "+" || item === "-")
        );
      }
      const currentSymbol = symbols[indexSymbol];
      let currentResult = 0;
      switch (currentSymbol) {
        case "/":
          currentResult = numbers[indexSymbol] / numbers[indexSymbol + 1];
          break;
        case "X":
          currentResult = numbers[indexSymbol] * numbers[indexSymbol + 1];
          break;
        case "+":
          currentResult = numbers[indexSymbol] + numbers[indexSymbol + 1];
          break;
        case "-":
          currentResult = numbers[indexSymbol] - numbers[indexSymbol + 1];
          break;
      }
      numbers.splice(indexSymbol, 2, currentResult);
      symbols.splice(indexSymbol, 1);
      return Calculate(numbers, symbols);
    } else {
      return numbers[0];
    }
  };

  const handleEqual = () => {
    if (/\d$/.test(operation)) {
      const numbers = operation.split(/[/X+-]/g).map((n) => parseFloat(n));
      const symbols = operation
        .split(/\d+/g)
        .filter((item) => item !== "" && item !== ".");
      let equalTo = Calculate(numbers, symbols);
      setOperation(equalTo.toString());
      return equalTo.toString();
    }
    return " Error";
  };

  const clickOther = (s) => {
    switch (s) {
      case "AC":
        setResult("0");
        setOperation("");
        break;
      case ".":
        setResult(result.concat("."));
        setOperation(operation.concat("."));
        break;
      case "=":
        setResult(handleEqual());
        break;
      default:
        setResult(s);
        setOperation(operation.concat(s));
        break;
    }
    setCheck(!check);
  };

  useEffect(() => {
    checkOperation();
  }, [check]);

  return (
    <div className="btn-container">
      {btns.numbers.map((btn) => (
        <button
          className="buttons"
          id={btn.id}
          onClick={() => clickNumber(btn.n)}
        >
          {btn.n}
        </button>
      ))}
      {btns.others.map((btn) => (
        <button
          id={btn.id}
          className="buttons"
          onClick={() => clickOther(btn.s)}
        >
          {btn.s}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
