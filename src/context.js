import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [result, setResult] = useState("0");
  const [operation, setOperation] = useState("");
  return (
    <AppContext.Provider value={{ result, operation, setOperation, setResult }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
