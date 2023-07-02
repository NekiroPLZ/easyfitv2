/* eslint-disable no-sequences */
import React, { createContext, useContext, useState } from "react";

const ThemeSytles = {
  dark: {
    background: "#252525",
    textColor: "white",
  },
  light: {
    background: "#efefef",
    textColor: "black",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [Theme, SetTheme] = useState("light");
  const ThemeHandler = () => (
    console.log("entro", ThemeSytles[Theme]),
    Theme === "light" ? SetTheme("dark") : SetTheme("light")
  );

  return (
    <ThemeContext.Provider
      value={{ Theme1: ThemeSytles[Theme], ThemeHandler, Theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const UseTheme = () => useContext(ThemeContext);
