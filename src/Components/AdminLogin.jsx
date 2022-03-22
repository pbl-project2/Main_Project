import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import Login from "./Login";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import Admin from "./Admin";
import { Snackbar } from "@material-ui/core";

function AdminLogin({ sales, orders, handleDelete, users }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const history = useHistory();

  //qrcode
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

  // const clearErrors = () => {
  //   setEmailError("");
  //   setPasswordError("");
  // };

  const handleLogin = () => {
    // clearErrors();
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError(true);
            setShowSnackbar(true);
            setSnackbarMessage("Email already in use");
            break;
          case "auth/invalid-email":
            setError(true);
            setSnackbarMessage("Invalid email");
            setShowSnackbar(true);
            break;
          case "auth/weak-password":
            setError(true);
            setSnackbarMessage("Password is too weak");
            setShowSnackbar(true);
            break;
        }
      });
  };

  const handleLogout = () => {
    app.auth().signOut();
  };
  const authListener = () => {
    let id = uuid();
    localStorage.setItem("adminId", id);
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        console.log(user);
        db.collection("admin")
          .doc(`${user.email}`)
          .set({
            adminId: localStorage.getItem("adminId"),
            email: user.email,
            qrcode: src,
          });
        console.log("db fired");
      } else {
        setUser("");
      }
    });
  };

  const handleSignUp = () => {
    // clearErrors();
    var text = `http://localhost:3000/foodmenu/${localStorage.getItem(
      "adminId"
    )}`;
    // QRCode.toDataURL(text).then((data) => {
    //   // setSrc(data);
    //   localStorage.setItem("qrcode", data);
    // });
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.code);
        setShowSnackbar(true);
        switch (error.code) {
          case "auth/invalid-email":
            setError(true);
            setSnackbarMessage("Invalid email");
            break;
          case "auth/user-disabled":
            setError(true);
            setSnackbarMessage("User disabled");
            break;
          case "auth/user-not-found":
            setError(true);
            setSnackbarMessage("User not found");
            break;
          case "auth/wrong-password":
            setError(true);
            setSnackbarMessage("Wrong password");
            break;
        }
      });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      {user ? (
        <Admin
          admin={user}
          sales={sales}
          orders={orders}
          handleDelete={handleDelete}
          user={users}
          email={email}
          src={src}
          logout={handleLogout}
          text="http://localhost:3000/admin"
        />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          // emailError={emailError}
          // passwordError={passwordError}
          error={error}
          snackbarMessage={snackbarMessage}
          showSnackbar={showSnackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
    </div>
  );
}

export default AdminLogin;
