import React from "react";
import "./NavBar.css";
import EasyFit from "../imagen/EasyFit.png";
function NavBar() {
  return (
    
    <div className="NavBar">
      <h1>Welcome to EasyFit</h1>
      <a href="/Login">Sing_in</a>
      <a href="/Register">Sing_up</a>
      <img src={EasyFit} width={80} height={160}></img>

    </div>
  );
}

export default NavBar;
