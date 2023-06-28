import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Sign_up() {
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

  return (
    <div>
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
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={changeHandler}
        ></input>

        <button>Register</button>
      </form>
    </div>
  );
}

export default Sign_up;
// const  [email,setEmail]=useState('');
// const [password,setPassword] = useState('');
