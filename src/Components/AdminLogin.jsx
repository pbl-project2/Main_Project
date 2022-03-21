import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import Login from "./Login";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import Admin from "./Admin";

function AdminLogin({ sales, orders, handleDelete, users }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  
  const history = useHistory();

  //qrcode
  const [src, setSrc] = useState("");

  useEffect(() => {
    db.collection("admin").doc(`${user.email}`).get().then((doc) => {
      if (doc.exists) {
        setSrc(doc.data().qrCode);
      }
    })
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
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
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
            name: localStorage.getItem("name"),
            contact: localStorage.getItem("contact"),
            // qrCode: localStorage.getItem("qrcode"),
            qrcode: src,
          });
        console.log("db fired");
      } else {
        setUser("");
      }
    });
  };

  const handleSignUp = () => {
    clearErrors();
    var text = `http://localhost:3000/foodmenu/${localStorage.getItem("adminId")}`;
    // QRCode.toDataURL(text).then((data) => {
    //   // setSrc(data);
    //   localStorage.setItem("qrcode", data);
    // });
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
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
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default AdminLogin;
