import React, { useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/FoodMenu.css";

const FoodCard = (props) => {
  const foodItem = {
    name: "",
    price: "",
    type: "",
    id: "",
  };
  const [quantity, setQuantity] = useState(1);

  const handleClick = async () => {
    let foodItem = {
      name: props.name,
      price: props.price,
      type: props.type,
      id: props.id,
    };
    const id = localStorage.getItem("userId");
    await db
      .collection("users")
      .doc(`${id}`)
      .collection("food")
      .doc(`${props.id}`)
      .set({
        name: props.name,
        price: props.price * quantity,
        type: props.type,
        id: props.id,
        quantity: quantity,
      });
    setQuantity(1);
    // alert("Food Item Added");
    // console.log(foodItem);
  };
  return (
    <div className="food-card">
      <div className="card-info">
        <div className="card-1">
          <h3 className="food-title">{props.name}</h3>
          <div className="price">Price: ₹{props.price}</div>
          <p>Quantity: <input
            type="number"
            value={quantity}
            placeholder=""
            style={{ width: "24%", borderRadius: "2px", outline: "none" }}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          /></p>
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
