import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import "../Styling/Login.css";
import "../Styling/Bill.css";
import { db } from "../firebase/firebase";

function Bill() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [total, setTotal] = useState(0);
  const [food, setFood] = useState([]);
  const handleClick = () => {
    history.push("/");
  };
  useEffect(async () => {
    await db // user details
      .collection("users")
      .doc(`${localStorage.getItem("userId")}`)
      .get()
      .then((doc) => {
        //   console.log(doc.data());
        setName(doc.data().name);
        setToken(doc.data().token);
        setTotal(doc.data().total);
      });

    db.collection("users")
      .doc(`${localStorage.getItem("userId")}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let billArr = [];
        snapshot.forEach((doc) => {
          billArr.push({ ...doc.data(), id: doc.id });
        });
        console.log(billArr);
        setFood(billArr);
        console.log("BILLARR: ", food);
      });
  }, [db]);
  return (
    <>
      <div className="admin-nav">
        <nav>
          <h3>UpMenu</h3>
          <button className="login-btn" onClick={handleClick}>
            Home Page
          </button>
        </nav>
      </div>
      <div className="bill">
        <div className="bill-items">
          <h1 className="bill-title">Bill</h1>
          <h1 style={{ color: "red" }}>{token}</h1>
          <h1>Name: {name}</h1>
          {food.map((item) => (
            <>
              <div className="food-items">
                <p>{item.name}</p>
                <p>{item.quantity}No.</p>
                <p>₹{item.price}</p>
              </div>
            </>
          ))}
          <h1>Total: ₹{total}</h1>
          <p>**PAY AT THE CANTEEN**</p>
        </div>
      </div>
    </>
  );
}

export default Bill;