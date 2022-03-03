import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";

function Admin({ user, handleDelete, income }) {
  const [food, setFood] = useState([]);
  // const [completed, setCompleted] = useState(false);
  // const [completedArr1, setCompletedArr1] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(`${user.id}`).collection("food")
      .onSnapshot((snapshot) => {
        let foodArr = [];
        snapshot.forEach((doc) => {
          foodArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(foodArr);
        console.log("FOOD ARR: ", foodArr);
      });
  }, [db]);
    // const handleComplete = async (id) => {
    //   await db.collection("users").doc(`${user.id}`).collection("food").doc(`${id}`).update({
    //     completed: true,
    //   });
    //   setCompleted(true);
    //   await db.collection("users").where("completed", "==", false).get().then(function(querySnapshot) {
    //     let completedArr = [];
    //     querySnapshot.forEach(function(doc) {
    //       completedArr.push({ ...doc.data(), id: doc.id });
    //     });
    //     setCompletedArr1(completedArr);
    //     console.log("COMPLETED ARR: ", completedArr1);
    //   });
    // }
    const handleComplete = async (id) => {
      await db.collection("users").doc(`${user.id}`).update({
        completed: true,
      });
    }

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
