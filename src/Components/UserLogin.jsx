import React, { useRef, useState } from "react";

import "../Styling/Login.css";
import { auth, provider } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { Mic } from "@mui/icons-material";
import "//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js";
import annyang from "annyang";
import { Snackbar } from "@mui/material";

const Login = () => {
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleVoice  = () => {
    if (annyang) {
      var commands = {
        "Go to login page": function() {
          history.push("/customer-login");
        },
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (
          result.user.email === "mrudulpatel04@gmail.com" ||
          result.user.email === "atharvakurumbhatte47@gmail.com" ||
          result.user.email === "limbhoremayu7@gmail.com"
        ) {
          history.push(`/admin/${localStorage.getItem("o")}`);
        } else {
          // alert("Sorry you are not an admin!!");
          setShowSnackbar(true);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // const handleVoice = () => {
  //   if (annyang) {
  //     var commands = {
  //       "Redirect me to food menu": function () {
  //         history.push("/customer-login");
  //       },
  //     };
  //     annyang.addCommands(commands);
  //     annyang.start({ autoRestart: true, continuous: false });
  //   }
  // };

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>
            Up<span className="icon-span">Menu</span>
          </h3>
          <button onClick={handleVoice}>
            <Mic />
          </button>
          <button className="login-btn" onClick={signInWithGoogle}>
            Login as Admin
          </button>
        </nav>
        {
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            message="Sorry you are not an admin!!"
          />
        }
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
