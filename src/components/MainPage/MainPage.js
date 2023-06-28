import React from "react";
import "./MainPage.css";
import NavBar from "../NavBar/NavBar";
import CaloriesCalculator from "../CaloriesCalculator/CaloriesCalculator";
import BlogInformation from "../BlogInformation/BlogInformation";
import SearchBar from "../SearchBar/SearchBar";

function MainPage() {
  return (
    <div>
      <div>
        <NavBar />
        <CaloriesCalculator />
        <SearchBar />
        <BlogInformation />
      </div>
    </div>
  );
}

export default MainPage;
