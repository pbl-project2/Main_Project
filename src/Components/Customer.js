import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import uniqueRandom from "unique-random";

//Styling
import "../Styling/Login.css";
import { useHistory } from "react-router-dom";

function Customer() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let id = uuid();
    setUserId(id);
    console.log(id);
  }, []);
  const history = useHistory();
  const [name, setName] = useState("");
  const [mobile, setMobile]= useState(0);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && mobile !== 0) {
      let timestamp = firebase.firestore.FieldValue.serverTimestamp();
      // let token = Math.floor(Math.random() * 100 + 1);
      let random = uniqueRandom(1000, 2000);
      let token = random();
      localStorage.setItem("userId", userId);
      await db.collection("users").doc(`${userId}`).set({
        id: userId,
        name: name,
        mobile: mobile,
        timestamp: timestamp,
        token: token,
      });
      history.push(`/foodmenu/${userId}`);
      console.log("Customer Added");
      setName("");
      setMobile(0);
    } else {
      alert("Name or mobile number is missing");
    }
  };
  return (
    <div className="login">
      <div className="main_login">
        <nav>
          <h3>UpMenu</h3>
          <button className="login-btn" onClick={() => history.push("/")}>
            Home Page
          </button>
        </nav>
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
