import React, { useState } from "react";
//Iconos/Imagen
import EasyFit from "../imagen/EasyFit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import "./Sign.css";

import firstImage from "../Image/Jay-Cutler-quad-stomp-1.png";
import secondImage from "../Image/Ronnie.jpg";
import thirdImage from "../Image/Cbum.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Credentials";


import {

  GoogleAuthProvider,
  signInWithPopup
  
} from "firebase/auth";
function Sign_in() {

  const navigate = useNavigate();
  const [Style, SetStyle] = useState(faEyeSlash)
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
  const checkBoxHandler = () => {
    const adminCode = window.prompt("Enter admin code");
    if (adminCode === adminPassword) {
      setAdminCheck(!adminCheck);
    } else {
      alert("Incorrect Code");
    }

    console.log(adminCheck);
  };
 
  const { login, logingoogle} = useAuth();

  const LoginGoogleHandler = async(event) =>{
    
    event.preventDefault();
    if (adminCheck) {
      try {
        await await logingoogle()
        navigate("/UserInterface");
        
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await await logingoogle()
        navigate("/UserInterface");
      } catch (error) {
        alert(error);
      }
    }
  }
  const submitUserHandler = async (event) => {

    if (user.email.includes('@' && ".com")) {
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
  }else{alert("Falta .com")}};
  const goToRegisterHandler = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    
    <>

       <div className="Sign">
        <a href="/">Home</a>
        <img src={EasyFit} width={80} height={160}></img>
      </div>

      
      <div className="Main">
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
          <form onSubmit={submitUserHandler}>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={changeHandler}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type={TypeInput}
                placeholder="Enter your password"
                name="password"
                onChange={changeHandler}
              ></input>
                 {/* Visualicacion de contraseña + icono*/}
        <FontAwesomeIcon icon={Style}
          className="icon"
          onClick={() => (SetTypeInput(Style === faEyeSlash ? "Text" : "Password"), SetStyle(Style === faEyeSlash ? faEye : faEyeSlash))}
        />
            </div>
            <div>
              <input
                type="checkbox"
                id="adminCheck"
                name="adminCheck"
                value="check"
                onChange={checkBoxHandler}
              ></input>
              <p>Admin</p>
            </div>
            <button className="btn btn-primary">Sign In</button>
          </form>

          <button onClick={LoginGoogleHandler}>Login with Google</button>

          <div className="form-group">
            
            <button
              className="btn btn-secondary mt-4 form-control"
              onClick={goToRegisterHandler}
            >
              <h2>Register</h2> 
            </button>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Sign_in;
