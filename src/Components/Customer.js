import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import uniqueRandom from "unique-random";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";

//Styling
import "../Styling/Login.css";

function Customer() {
  const [userId, setUserId] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    let id = uuid();
    setUserId(id);
  }, []);
  const history = useHistory();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(0);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && mobile !== 0) {
      let timestamp = firebase.firestore.FieldValue.serverTimestamp();
      // let token = Math.floor(Math.random() * 100 + 1);
      let random = uniqueRandom(1000, 9999);
      let token = random();
      localStorage.setItem("userId", userId);
      if (mobile.toString().length === 10) {
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("mobile", mobile);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("timestamp", timestamp);
        sessionStorage.setItem("id", userId);
        history.push(`/foodmenu/${userId}`);
        setName("");
        setMobile(0);
      } else {
        setSnackbarMessage("Please enter valid 10 digit mobile number");
        setShowSnackbar(true);
      }
    } else {
      setShowSnackbar(true);
      setSnackbarMessage("Name or mobile number is missing");
      {
      }
    }
  };

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>
            Up<span className="icon-span">Menu</span>
          </h3>
          <button className="login-btn" onClick={() => history.push("/")}>
            Home Page
          </button>
        </nav>
        {
          <Snackbar
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />}
        <header>
          <h1 className="heading">Login to Order food</h1>
        </header>
        <div className="input_fields">
          <form onSubmit={handleSubmit}>
            <div className="creds">
              <input
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Enter mobile number"
                onChange={(e) => setMobile(e.target.value)}
              />
              <button className="login-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Customer;
