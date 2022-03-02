import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";

function Admin({ user, handleDelete }) {
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
        console.log("FOOD ARR: ", foodArr);
      });
  }, [user]);
  return (
    <>
      <div className="container">
        <div className="adminuser">
          <h1>{user.token}</h1>
          <p>{user.name}</p>
          <p>{user.mobile}</p>
          {food.map((item) => (
            <div className="food-items">
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
          <p>Total: ₹{user.total}</p>
          <button className="delete-btn" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
