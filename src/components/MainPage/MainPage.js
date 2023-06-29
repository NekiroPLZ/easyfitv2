import React from "react";
import "./MainPage.css";
import NavBar from "../NavBar/NavBar";
import CaloriesCalculator from "../CaloriesCalculator/CaloriesCalculator";
import BlogInformation from "../BlogInformation/BlogInformation";
import SearchBar from "../SearchBar/SearchBar";
import { UseTheme } from "../../context/ThemeContext";


function MainPage() {
//Cambiar fondo
const {Theme, ThemeHandler,Theme1} = UseTheme()
document.body.style.backgroundColor = Theme1.background;
document.body.style.color =  Theme1.textColor;
  return (
      <div>
          <NavBar />
          <CaloriesCalculator />
          <SearchBar />
          <BlogInformation />
          <button onClick={ThemeHandler}>{Theme === "dark" ? "Light Mode" : "Dark Mode"}</button>  
      </div>

  );
}

export default MainPage;
