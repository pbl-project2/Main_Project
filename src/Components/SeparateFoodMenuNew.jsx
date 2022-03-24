import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";

function SeparateFoodMenuNew() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await db.collection("foodMenu").doc(`${name}`).set({
    //   name: name,
    //   type: type,
    //   price: price,
    //   description: description,
    // });
    await db.collection("admin").doc(`${window.location.pathname.split("/")[2]}`).collection("foodMenu").doc(`${name}`).set({
        name: name,
        type: type,
        price: price,
        description: description,
    });
    setName("");
    setType("");
    setPrice(0);
    setDescription("");
    document.getElementById("form").reset();
  };
  return (
    <div>
      <nav>
        <h3>UpMenu</h3>
        <button
          onClick={() =>
            history.push(`/separate-menu/${window.location.pathname.split("/")[2]}`)
          }
          className="button"
        >
          Back to Menu
        </button>
      </nav>
      <form onSubmit={handleSubmit} id="form" className="form">
        <div className="food_name">
          <label>Name: </label>
          <input
            type="text"
            placeholder="Enter food name..."
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </div>
        <div className="price">
          <label>Price: </label>
          <input
            type="tel"
            placeholder="Enter food price..."
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="type">
          <label>Type: </label>
          <input
            type="text"
            placeholder="Enter food type..."
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="desc">
          <label>Description: </label>
          <input
            type="text"
            placeholder="Enter food description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="button">Add</button>
      </form>
    </div>
  );
}

export default SeparateFoodMenuNew;