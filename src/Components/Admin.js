import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "../Components/AdminNav";
import CustomerData from "./CustomerData";

function Admin({ user, handleDelete, sales, orders }) {
  const [food, setFood] = useState([]);
  const [finalSales, setFinalSales] = useState(0);
  const [finalOrders, setFinalOrders] = useState(0);
  const [finalArr, setFinalArr] = useState([]);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);

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
      .doc("1 stars")
      .get()
      .then((doc) => {
        setOne(doc.data().rating);
      });
    db.collection("admin")
      .doc("2 stars")
      .get()
      .then((doc) => {
        setTwo(doc.data().rating);
      });
    db.collection("admin")
      .doc("3 stars")
      .get()
      .then((doc) => {
        setThree(doc.data().rating);
      });
    db.collection("admin")
      .doc("4 stars")
      .get()
      .then((doc) => {
        setFour(doc.data().rating);
      });
    db.collection("admin")
      .doc("5 stars")
      .get()
      .then((doc) => {
        setFive(doc.data().rating);
      });
  }, [db]);

  useEffect(() => {
    db.collection("admin")
      .doc("details")
      .get()
      .then((doc) => {
        let arr = [];
        arr.push(doc.data());
        setFinalArr(arr);
        console.log("ARR: ", arr);
      });
  }, []);
  return (
    <>
      <AdminNav />
      <div className="upper-body container">
        {/* For income and orders served */}

        <div className=" divs-combine row">
          <div className="income col">
            <h1>You've Earned</h1>
            <h3>Sales: ₹{sales}</h3>
            {/* <h1>Orders Served: {orders}</h1> */}
          </div>
          <div className="served-orders col">
            <h1>You've Served</h1>
            {/* <h1>Sales: ₹{sales}</h1> */}
            <h3>{orders} orders</h3>
          </div>
        </div>
      </div>

      <p className="orders-title">You need to serve these orders...Hurry Up!</p>
      <div className="all-orders">
        {/* For customer data */}
        {user.map((user) => (
          <CustomerData
            key={user.id}
            q
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
