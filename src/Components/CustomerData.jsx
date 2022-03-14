import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Login.css";

function CustomerData({ user, handleDelete }) {
  const [food, setFood] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(`${user.id}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let foodArr = [];
        snapshot.forEach((doc) => {
          foodArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(foodArr);
        // console.log("FOOD ARR: ", foodArr);
      });
  }, [db]);

  return (
    <>
      <div className="customer-data">
        <h3>#{user.token}</h3>
        <h3>{user.name}</h3>
        {food.map((fooditem) => (
          <div>
            <h3>{fooditem.name}</h3>
            <h3> x {fooditem.quantity}</h3>
            <h3>₹{fooditem.price}</h3>
          </div>
        ))}
        <h3>Total: ₹{user.total}</h3>
        <button className="login-btn" onClick={() => handleDelete(user.id)}>Complete</button>
      </div>
    </>
  );
}

export default CustomerData;
