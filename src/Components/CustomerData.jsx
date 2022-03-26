import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Login.css";
import "../Styling/CustomerData.css";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

function CustomerData({ user, handleDelete }) {
  const [food, setFood] = useState([]);
  // const [sales, setSales] = useState(0);
  // const [orders, setOrders] = useState(0);

  useEffect(() => {
    const sale = localStorage.getItem("sales");
    const order = localStorage.getItem("orders");
  }, []);

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
            <ArrowDropDownCircleOutlinedIcon />
          </div>
          <div className="order-content">
            {food.map((fooditem) => (
              <div className="admin-food-items">
                <table className="users-orders">
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
        <button
          className="login-btn"
          onClick={() => {
            // var sale = sales + user.total;
            // var order = orders + 1;
            // localStorage.setItem("finalSales", sale + user.total);
            // localStorage.setItem("finalOrders", orders + 1);
            // db.collection("admin").doc(`${localStorage.getItem("adminEmail")}`).update({
            //   sales: firebase.firestore.FieldValue.increment(sale),
            //   orders: firebase.firestore.FieldValue.increment(1),
            // });
            handleDelete(user.id);
          }}
        >
          Complete
        </button>
      </div>
    </>
  );
}

export default CustomerData;
