import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "../Styling/Login.css";

// import firebase from "firebase";
// import { auth } from "../firebase";

const Login = () => {
  // const [name, setName] = useState("");
  // const [pass, setPass] = useState("");
  // const handleSubmit = () => {
  //   auth
  //     .createUserWithEmailAndPassword(name, pass)
  //     .then((authUser) => {
  //       console.log(authUser);
  //     })
  //     .catch((error) => alert(error.message));
  //   alert("hi");
  // };

  const history = useNavigate();

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>UpMenu</h3>

          <button className="login-btn">LogIn as Admin</button>
        </nav>

        <header>
          <h1 className="heading">
            Let's Order Some <span>Food...</span>
          </h1>
        </header>
        <div className="input_fields">
          <p>Lets get you to our canteen menu</p>
          <div className="creds">
            {/* <input
            type="email"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }} 
          />  */}
            {/* <input
            type="password"
            placeholder="Enter Your password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          /> */}
            <button
              className="lesgo-btn"
              type="submit"
              onClick={() => {
                history("/FoodMenu");
              }}
            >
              Lesgo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
