// GlobalStateContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Create context
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [menuBar, setMenuBar] = useState(false);
  const [hamburger, setHamburger] = useState(true);
  const [userLoginInfo, setUserLoginInfoState] = useState(null);
  const [object, setObject] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  return (
    <GlobalStateContext.Provider
      value={{
        menuBar,
        setMenuBar,
        hamburger,
        setHamburger,
        userLoginInfo,
        object,
        setObject,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalStateContext);
