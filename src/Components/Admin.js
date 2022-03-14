import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "../Components/AdminNav";

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
      <AdminNav />
      {user.map((user) => (
        < key={user.id} user={user} />
      ))}
    </>
  );
}

export default Admin;
