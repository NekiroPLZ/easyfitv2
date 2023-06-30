import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import EasyFit from "../imagen/EasyFit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { UseTheme } from "../../context/ThemeContext";

function Sign_up() {
  const [Style, SetStyle] = useState(faEyeSlash)
  const [TypeInput, SetTypeInput] = useState("Password");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const { signup } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  //Modo oscuro
  const {Theme, ThemeHandler, Theme1} = UseTheme()
  document.body.style.backgroundColor = Theme1.background;
  document.body.style.color =  Theme1.textColor;

  return (
    <div> 
          <div className="Sign">
        <a href="/">Home</a>
        <img src={EasyFit} width={80} height={160}></img>
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={changeHandler}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type={TypeInput}
          placeholder="Enter your password"
          name="password"
          onChange={changeHandler}
        ></input>
          <FontAwesomeIcon icon={Style}
          className="icon"
          onClick={() => (SetTypeInput(Style === faEyeSlash ? "Text" : "Password"), SetStyle(Style === faEyeSlash ? faEye : faEyeSlash))}
        />

        <button>Register</button>
      </form>
      <button onClick={ThemeHandler}>{Theme === "dark" ? "Light Mode" : "Dark Mode"}</button>
    </div>
  );
}

export default Sign_up;
// const  [email,setEmail]=useState('');
// const [password,setPassword] = useState('');
