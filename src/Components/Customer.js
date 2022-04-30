import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import uniqueRandom from "unique-random";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { toast } from "react-toastify";

//Styling
import "../Styling/Login.css";
import Footer from "./Footer";

function Customer() {
  const [userId, setUserId] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    document.title = `Customer | ${window.location.pathname.split("/")[2]}`;
  }, []);

  useEffect(() => {
    let id = uuid();
    console.log(id);
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
        localStorage.setItem("name", name);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("token", token);
        localStorage.setItem("timestamp", timestamp);
        localStorage.setItem("id", userId);
        history.push(`/foodmenu/${window.location.pathname.split("/")[2]}/${userId}`);
        setName("");
        setMobile(0);
      } else {
        // setSnackbarMessage("Please enter valid 10 digit mobile number");
        // setShowSnackbar(true);
        toast.error("Please enter valid 10 digit mobile number");
      }
    } else {
      // setShowSnackbar(true);
      // setSnackbarMessage("Name or mobile number is missing");
      toast.error("Name or mobile number is missing");
    }
  };

  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>
            Up<span className="icon-span">Menu</span>
          </h3>
          <div className="right">
          <button className="login-btn" style={{marginRight: "1rem"}} onClick={() => history.push("/about-us")}>About Us</button>
          <button className="login-btn" onClick={() => history.push("/")}>
            Home Page
          </button>
          </div>
        </nav>
        {
          <Snackbar
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        }
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
              <button className="login-btn log-resp">Submit</button>
            </div>
          </form>
        </div>
      </div>
        <Footer />
    </div>
  );
}

export default Customer;
