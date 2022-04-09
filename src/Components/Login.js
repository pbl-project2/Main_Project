import { Snackbar } from "@material-ui/core";
import { Error } from "@mui/icons-material";
import { Alert } from "@mui/material";
import React from "react";

//Styling
import "../Styling/AdminLogin.css";

function Login(props) {
  const {
    handleSignUp,
    email,
    // emailError,
    password,
    // passwordError,
    setEmail,
    setPassword,
    handleLogin,
    hasAccount,
    setHasAccount,
    error,
    handleSnackbarClose,
    showSnackbar,
    snackbarMessage,
  } = props;

  return !hasAccount ? (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          className="error"
        >
          <Alert
            icon={<Error fontSize="inherit" />}
            severity="error"
            style={{ color: "white" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
      <div className="loginContainer">
        <div className="form1">
          <h1 className="h1">Registration</h1>
          {/* <label className="details">Email</label> */}
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <p className="errorMsg">{emailError}</p> */}
          {/* <label className="details">Password</label> */}
          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="errorMsg">{passwordError}</p> */}
          <div className="btn-container">
            {hasAccount ? ( //true
              <div className="login_btn">
                <button className="btn" onClick={handleLogin}>
                  Login
                </button>
                <p>
                  Don't have an Account?{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            ) : (
              <div className="login_btn">
                <button className="btn" onClick={handleSignUp}>
                  Sign Up
                </button>
                <p>
                  Have an account ?{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          className="error"
        >
          <Alert icon={<Error fontSize="inherit" />} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
      <div className="loginContainer">
        <div className="form1">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              localStorage.setItem("email", e.target.value);
            }}
          />
          {/* <p className="errorMsg">{emailError}</p> */}
          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="errorMsg">{passwordError}</p> */}
          <div className="btn-container">
            <div className="login_btn">
              <button className="btn" onClick={handleLogin}>
                Login
              </button>
              <p>
                Don't have an Account?
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
