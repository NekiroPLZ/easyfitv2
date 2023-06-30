import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../Image/logo.jpg";
import { UseTheme } from "../../context/ThemeContext";
function NavBar() {
  const { Theme, ThemeHandler, Theme1 } = UseTheme();
  document.body.style.backgroundColor = Theme1.background;
  document.body.style.color = Theme1.textColor;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="me-3">
            <img src={logo} width="60px" style={{ borderRadius: 80 }}></img>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link btn btn-outline-primary">
                  Home
                </Link>
              </li>
            </ul>
            {/* <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              </form> */}
            <div className="d-flex">
              <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/Login" className="nav-link btn btn-outline-success">
                  Login
                </Link>

                <button
                  className="ms-2 nav-link btn btn-outline-dark"
                  onClick={ThemeHandler}
                >
                  {Theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
