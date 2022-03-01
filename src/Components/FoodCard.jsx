import React from "react";
import { db } from "../firebase/firebase";
import "../Styling/FoodMenu.css";

const FoodCard = (props) => {

  const foodItem = {
    name: "",
    price: "",
    type: "",
    id: "",
  };

  const handleClick = async () => {
    let foodItem = {
      name: props.name,
      price: props.price,
      type: props.type,
      id: props.id,
    };
    
    // await addDoc(collection(db, "users"), {
    //   foodItem: foodItem,
    // });
    // await db.collection("food").add({
    //   foodItem: foodItem,
    // });
    // await db.collection("users").doc(`${userId}`).collection("food").doc(`${props.id}`).set({
    //   foodItem: foodItem,
    // });
    // localStorage.setItem(`${props.foodId}`, props.id);
    const id = localStorage.getItem("userId");
    await db.collection("users").doc(`${id}`).collection("food").doc(`${props.id}`).set({
        name: props.name,
        price: props.price,
        type: props.type,
        id: props.id,
      });
    alert("Food Item Added");
    console.log(foodItem);
  };
  return (
    <div className="food-card">
      {/* <div class="vl"></div> */}
      <div className="card-info">
        <div className="card-1">
          <h3 className="food-title">{props.name}</h3>
          <div className="price">{props.price}</div>
          <p className="info">{props.description}</p>
          <hr className="card-diversion" />
        </div>
        <div>
          <button className="add-btn" onClick={handleClick}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
