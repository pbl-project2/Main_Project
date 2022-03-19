import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Login.css";
import "../Styling/CustomerData.css";
import ArrowDropIcon from "@mui/icons-material/ArrowDropDown";


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
        <h5>#{user.token}</h5>
        <h5 className="user-name-order">{user.name}</h5>
        <div className="orders-admin">
          <div className="arrow-icon">
            <ArrowDropIcon />
          </div>
          <div className="order-content">
            {food.map((fooditem) => (
              <div className="admin-food-items">
                <table>
                  <tr>
                    <th className="name-order">{fooditem.name}</th>
                    <th className="quantity-order"> x {fooditem.quantity}</th>
                    <th className="price-order">₹{fooditem.price}</th>
                  </tr>
                </table>
                
              </div>
            ))}
          </div>
        </div>

        <h5 className="payment">Total: ₹{user.total}</h5>
        <button className="login-btn" onClick={() => handleDelete(user.id)}>
          Complete
        </button>
      </div>
    </>
  );
}

export default CustomerData;
