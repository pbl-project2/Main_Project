import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import "../Styling/Login.css";
import { auth, provider } from "../firebase/firebase";

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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user.email === "mrudulpatel04@gmail.com") {
          history("/admin");
        } else {
          alert("Sorry you are not an admin!!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>UpMenu</h3>
          <button className="login-btn" onClick={signInWithGoogle}>
            LogIn as Admin
          </button>
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
