import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "../Components/AdminNav";
import CustomerData from "./CustomerData";

function Admin({ user, handleDelete, admin, sales, orders, email, password }) {
  const [food, setFood] = useState([]);
  const [finalArr, setFinalArr] = useState([]);

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
        let arr = [];
        arr.push(doc.data());
        setFinalArr(arr);
        console.log("ARR: ", arr);
      });
  }, []);

  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    console.log("ADMIN: ", admin);
    let name="";
    console.log(admin.email);
    db.collection("admin")
      .doc(`${admin.email}`)
      .onSnapshot((doc) => {
        name = doc.data().name;
        setAdminName(name);
      });
  }, [db]);

  return (
    <>
      <AdminNav admin={admin} adminName={adminName} />
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
        {/* <h1>Admin Details</h1> */}
      </div>
  
      <p className="orders-title">You need to serve these orders...Hurry Up!</p>
      <div className="all-orders">
        {/* For customer data */}
        {user?.map((user) => (
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
