/* eslint-disable no-sequences */
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Sign.css";
function Sign_up() {
  const [Style, SetStyle] = useState(faEyeSlash);
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
    if (user.email.includes("@" && ".com")) {
      try {
        await signup(user.email, user.password);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Falta .com o Ingresar email");
    }
  };
  //Modo oscuro

  return (
    <div>
      <NavBar />
      <section class="vh-100">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black">
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form class="mx-1 mx-md-4" onSubmit={submitHandler}>
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
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
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password">
                              Password:
                            </label>
                            <div className="moving-eye-sign-up">
                              <input
                                className="form-control"
                                type={TypeInput}
                                placeholder="Enter your password"
                                name="password"
                                onChange={changeHandler}
                              ></input>

                              <FontAwesomeIcon
                                icon={Style}
                                className="icon  start-100   "
                                onClick={() => (
                                  SetTypeInput(
                                    Style === faEyeSlash ? "Text" : "Password"
                                  ),
                                  SetStyle(
                                    Style === faEyeSlash ? faEye : faEyeSlash
                                  )
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sign_up;
// const  [email,setEmail]=useState('');
// const [password,setPassword] = useState('');
