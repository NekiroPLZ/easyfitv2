import React, { useState } from "react";
//Iconos/Imagen
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import "./Sign.css";
import firstImage from "../Image/Jay-Cutler-quad-stomp-1.png";
import secondImage from "../Image/Ronnie.jpg";
import thirdImage from "../Image/Cbum.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Sign_in() {
  const navigate = useNavigate();
  const [Style, SetStyle] = useState(faEyeSlash);
  const [TypeInput, SetTypeInput] = useState("Password");
  const [adminCheck, setAdminCheck] = useState(true);
  const [adminPassword, setAdminPassword] = useState("admin");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Seteo de usuario contraseña y lectura del name del imput
  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //CheckBoxs
  const checkBoxHandler = () => {
    const adminCode = window.prompt("Enter admin code");
    if (adminCode === adminPassword) {
      setAdminCheck(!adminCheck);
    } else {
      alert("Incorrect Code");
    }
  };

  const { login, logingoogle } = useAuth();

  //Boton de login con google
  const LoginGoogleHandler = async (event) => {
    event.preventDefault();
    if (adminCheck) {
      try {
        await await logingoogle();
        navigate("/UserInterface");
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await await logingoogle();
        navigate("/AdminInterface");
      } catch (error) {
        alert(error);
      }
    }
  };
  //Boton de login
  const submitUserHandler = async (event) => {
    if (user.email.includes("@" && ".com")) {
      event.preventDefault();
      if (adminCheck) {
        try {
          await login(user.email, user.password);
          navigate("/UserInterface");
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          await login(user.email, user.password);
          navigate("/AdminInterface");
        } catch (error) {
          alert(error);
        }
      }
    } else {
      alert("Falta .com");
    }
  };
  //Boton de Redirecion
  const goToRegisterHandler = (event) => {
    event.preventDefault();
    navigate("/register");
  };
  //Modo oscuro

  return (
    <div>
      <NavBar />

      <div className="row container p-4">
        <div className="col-md-7">
          <div className="styles-border">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={firstImage} alt="" className="image" />
                </div>
                <div className="carousel-item">
                  <img src={secondImage} alt="" className="image" />
                </div>

                <div className="carousel-item">
                  <img src={thirdImage} alt="" className="image" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="mt-5 ms-5">
            <div className="border border-3 border-primary">
              <form onSubmit={submitUserHandler} className="px-5">
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={changeHandler}
                  ></input>
                </div>
                <div className="mb-3">
                  <div className="position-relative">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      className="form-control"
                      type={TypeInput}
                      placeholder="Enter your password"
                      name="password"
                      onChange={changeHandler}
                    ></input>
                    <FontAwesomeIcon
                      icon={Style}
                      className="icon position-absolute  bottom-0 end-0 moving-eye "
                      onClick={() => (
                        SetTypeInput(
                          Style === faEyeSlash ? "Text" : "Password"
                        ),
                        SetStyle(Style === faEyeSlash ? faEye : faEyeSlash)
                      )}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="adminCheck"
                    name="adminCheck"
                    value="check"
                    onChange={checkBoxHandler}
                  ></input>
                  Admin
                </div>
                <div className="d-inline pl-2 ">
                  <button className="btn btn-primary btn-sm ">Sign In</button>
                </div>
                <div className="d-inline p-2 ">
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={LoginGoogleHandler}
                  >
                    Login with Google
                  </button>
                </div>
              </form>

              <div className="form-group px-5 pb-1">
                <button
                  className="btn btn-secondary mt-4 form-control "
                  onClick={goToRegisterHandler}
                >
                  <h2>Register</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign_in;
