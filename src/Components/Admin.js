import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";

function Admin({ user, handleDelete, income }) {
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
  }, [db]);
  
  return (
    <>
      <div className="order">
        <div className="admin-user">
        </div>
        </div>
      <div className="container">
        {/* <div className="adminuser">
          {user ? (
            <>
              <h1>{user.token}</h1>
              <p>{user.name}</p>
              <p>{user.mobile}</p>
              {food.map((item) => (
                <div className="food-items">
                  <p>{item.name}</p>
                  <p> x {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}
              <p>Total: ₹{user.total}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </>
          ) : (
            "No orders right now"
          )} */}
          {/* <h1>{user.token}</h1>
          <p>{user.name}</p>
          <p>{user.mobile}</p>
          {food.map((item) => (
            <div className="food-items">
              <p className="admin-food-name">{item.name}</p>
              <p> x {item.quantity}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
          <p>Total: ₹{user.total}</p>
          <button className="delete-btn" onClick={() => handleDelete(user.id)}>
            Delete
          </button> */}
        {/* </div> */}
        <div class="card">
          <div class="card-header order-title">Featured</div>
          <div class="card-body">
            <h2 class="card-token">{user.token}</h2>
            <h5 class="card-title">{user.name}</h5>
            {food.map((item) => (
              <div className="food-items">
                <p className="admin-food-name">{item.name}</p>
                <p className="food-quantity"> x{item.quantity}</p>
                <p className="food-price">₹{item.price}</p>
              </div>
            ))}
            <h5>Total: ₹{user.total}</h5>
            <button
              href="#"
              class="btn btn-primary complete"
              onClick={() => handleDelete(user.id)}
            >
              Complete
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Admin;
