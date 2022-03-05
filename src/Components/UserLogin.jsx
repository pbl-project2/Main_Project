import React from "react";

import "../Styling/Login.css";
import { auth, provider } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (
          result.user.email === "mrudulpatel04@gmail.com" ||
          result.user.email === "atharvakurumbhatte47@gmail.com"
        ) {
          history.push(`/admin/${localStorage.getItem("o")}`);
        }
        else {
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
          <h3>
            Up<span className="icon-span">Menu</span>
          </h3>
          <button className="login-btn" onClick={signInWithGoogle}>
            Login as Admin
          </button>
        </nav>

        <header>
          <h1 className="heading">
            Let's Order Some <span className="food-span">Food...</span>
          </h1>
        </header>
        <div className="input_fields">
          {/* <p>Lets get you to our canteen menu</p> */}
          <div className="creds">
            <button
              className="lesgo-btn"
              type="submit"
              onClick={() => history.push("/customer-login")}
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
