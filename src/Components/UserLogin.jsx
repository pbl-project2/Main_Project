import React, { useState } from "react";

import "../Styling/Login.css";
import { useHistory } from "react-router-dom";

import { Snackbar } from "@mui/material";
import Footer from "./Footer";

const Login = () => {
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);

  // const signInWithGoogle = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       if (
  //         result.user.email === "mrudulpatel04@gmail.com" ||
  //         result.user.email === "atharvakurumbhatte47@gmail.com" ||
  //         result.user.email === "limbhoremayu7@gmail.com"
  //       ) {
  //         history.push(`/admin/${localStorage.getItem("o")}`);
  //       } else {
  //         // alert("Sorry you are not an admin!!");
  //         setShowSnackbar(true);
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>
            Up<span className="icon-span">Menu</span>
          </h3>
          <button
            className="homepage-btn"
            onClick={() => history.push("/admin-login")}
          >
            Login as Admin
          </button>
          {/* <button onClick={}>Login Admin</button> */}
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
            {/* <button
              className="lesgo-btn"
              type="submit"
              onClick={() => history.push("/customer-login")}
            >
              Lesgo
            </button> */}
            <button
              className="lesgo-btn"
              type="submit"
              onClick={() => history.push(`/qrcode-scan`)}
            >
              Lesgo
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
