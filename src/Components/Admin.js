import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "../Components/AdminNav";
import CustomerData from "./CustomerData";

function Admin({ user, handleDelete }) {
  const [food, setFood] = useState([]);
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);

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

  useEffect(() => {
    db.collection("admin")
      .doc("details")
      .get()
      .then((doc) => {
        console.log("Doc: ", doc.data());
        var sales = doc.data().sales;
        var orders = doc.data().orders;
        if (doc.exists) {
          setSales(sales);
          setOrders(orders);
        }
      });
  }, [sales, orders]);

  return (
    <>
      <AdminNav />
      <div>
        {/* For income and orders served */}
        <h1>Admin Details</h1>
        <h1>Sales: ₹{sales}</h1>
        <h1>Orders Served: {orders}</h1>
        <h1>hello</h1>
      </div>
      <div>
        {/* For customer data */}
        {user.map((user) => (
          <CustomerData
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            food={food}
          />
        ))}
      </div>
      {/* <AdminNav />
      {user.map((user) => (
        < key={user.id} user={user} />
      ))} */}
    </>
  );
}

export default Admin;
