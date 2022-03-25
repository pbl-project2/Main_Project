import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import "../Styling/MenuNew.css";

function EditFood() {
  const history = useHistory();
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  const food = JSON.parse(localStorage.getItem("food"));

  const handleSubmit = async () => {
    // await db.collection("foodMenu").doc(`${food.name}`).update({
    //   price: price,
    //   description: desc,
    // });
    await db
      .collection("admin")
      .doc(`${window.location.pathname.split("/")[2]}`)
      .collection("foodMenu")
      .doc(`${food.name}`)
      .update({
        price: price,
        description: desc,
      });
    setPrice(0);
    setDesc("");
    document.getElementById("form").reset();
  };
  return (
    <div>
      <nav>
        <h3>UpMenu</h3>
        <button
          onClick={() =>
            history.push(`/admin-menu/${window.location.pathname.split("/")[2]}`)
          }
          className="button"
        >
          Back to Menu
        </button>
      </nav>
      <div className="current">
        <h1>Current Data</h1>
        <h3>Name: {food.name}</h3>
        <h3>Price: ₹{food.price}</h3>
        <h3>Type: {food.type}</h3>
        <h3>Description: {food.description}</h3>
      </div>
      <div className="new">
        <h1>Edit details</h1>
        <form id="form" onSubmit={handleSubmit} className="form">
          <div className="price">
            <label>Price: </label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="desc">
            <label>Description: </label>
            <input type="text" onChange={(e) => setDesc(e.target.value)} />
          </div>
          <button className="button">Edit</button>
        </form>
      </div>
    </div>
  );
}

export default EditFood;
