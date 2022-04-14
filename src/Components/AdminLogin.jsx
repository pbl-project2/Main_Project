import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import app from "../firebase/firebase";
import Login from "./Login";
import { v4 as uuid } from "uuid";
import QRCode from "qrcode";
import Admin from "./Admin";
import Footer from "./Footer";
import { toast } from "react-toastify";

function AdminLogin({ sales, orders, handleDelete, users }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  const devEmail = "upmenudevs@upmenu.com";

  const handleSnackbarClose = (Transition) => {
    setShowSnackbar(false);
  };
  const [src, setSrc] = useState("");

  useEffect(() => {
    db.collection("admin")
      .doc(`${user.email}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setSrc(doc.data().qrCode);
        }
      });
  }, [db]);

  const clearInputs = () => {
    setPassword("");
    setEmail("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError(true);
            setShowSnackbar(true);
            setSnackbarMessage("Email already in use");
            toast.error("Email already in use");
            break;
          case "auth/invalid-email":
            setError(true);
            setSnackbarMessage("Invalid email");
            setShowSnackbar(true);
            toast.error("Invalid email");
            break;
          case "auth/weak-password":
            setError(true);
            setSnackbarMessage("Password is too weak");
            setShowSnackbar(true);
            toast.error("Password is too weak");
            break;
          default:
            console.log("");
        }
      });
  };

  const handleLogout = () => {
    app.auth().signOut();
  };
  const authListener = () => {
    let id = uuid();
    localStorage.setItem("adminId", id);
    localStorage.setItem("adminId", id);
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        // console.log(user);

        db.collection("admin")
          .doc(`${user.email}`)
          .set({
            adminId: localStorage.getItem("adminId"),
            adminId: localStorage.getItem("adminId"),
            email: user.email,
            qrcode: src,
            name: name,
          });
        console.log("db fired");
      } else {
        setUser("");
      }
    });
  };

  const handleSignUp = () => {
    var text = "https:canteen-token-system.web.app";
    clearErrors();
    QRCode.toDataURL(text).then((data) => {
      setSrc(data);
      localStorage.setItem("qrcode", data);
    });
    if (password.length < 8) {
      toast.error("Password too short");
      // setError(true);
      // setSnackbarMessage("Password is too short");
      // setShowSnackbar(true);
    } else if (password.search(/[A-Z]/) === -1) {
      // setError(true);
      // setSnackbarMessage(
      //   "Password must contain at least one uppercase character"
      // );
      setShowSnackbar(true);
      toast.error("Password must contain at least one uppercase character");
    } else if (password.search(/[0-9]/) === -1) {
      // setError(true);
      // setSnackbarMessage("Password must contain at least one number");
      // setShowSnackbar(true);
      toast.error("Password must contain at least one number");
    } else if (password.search(/[!@#$%^&*]/) === -1) {
      // setError(true);
      // setSnackbarMessage(
      //   "Password must contain at least one special character"
      // );
      // setShowSnackbar(true);
      toast.error("Password must contain at least one special character");
    } else if (password === rePassword) {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          setError(error.code);
          setShowSnackbar(true);
          switch (error.code) {
            case "auth/invalid-email":
              // setError(true);
              // setSnackbarMessage("Invalid email");
              toast.error("Invalid email");
              break;
            case "auth/user-disabled":
              // setError(true);
              // setSnackbarMessage("User disabled");
              toast.error("User disabled");
              break;
            case "auth/user-not-found":
              // setError(true);
              // setSnackbarMessage("User not found");
              toast.error("User not found");
              break;
            case "auth/wrong-password":
              // setError(true);
              // setSnackbarMessage("Wrong password");
              toast.error("Wrong password");
              break;
            default:
              break;
          }
        });
    } else {
      // setError(true);
      // setSnackbarMessage("Passwords do not match");
      // setShowSnackbar(true);
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      {user ? (
        user.email === devEmail ? (
          <div className="loginContainer">
            <div className="form1">
              <h1 className="h1">Registration</h1>
              {/* <label className="details">Email</label> */}
              <input
                type="text"
                placeholder="Enter CANTEEN NAME"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                placeholder="Re-enter Password"
                type="text"
                required
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              {/* <p className="errorMsg">{passwordError}</p> */}
              <div className="btn-container">
                <div className="login_btn">
                  <button className="btn" onClick={handleSignUp}>Sign Up</button>
                  <button className="btn" onClick={handleLogout}>Log Out</button>
                </div>
              </div>
              {/* <div className="btn-container">
                {hasAccount ? (
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
                )} */}
              {/* </div> */}
              <p className="password-validation">
                <span>➡️ Password must contain at least 8 characters</span>
                <br />
                <span>➡️ Password's first letter must be uppercase</span>
                <br />
                <span>
                  ➡️ Password must contain at least one numeric character
                </span>
                <br />
                <span>
                  ➡️ Password must contain at least one special character like
                  $,!,@,#
                </span>
              </p>
            </div>
          </div>
        ) : (
          <Admin
            admin={user}
            sales={sales}
            orders={orders}
            handleDelete={handleDelete}
            user={users}
            email={email}
            src={src}
            logout={handleLogout}
          />
        )
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          rePassword={rePassword}
          setRePassword={setRePassword}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          error={error}
          snackbarMessage={snackbarMessage}
          showSnackbar={showSnackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default AdminLogin;
