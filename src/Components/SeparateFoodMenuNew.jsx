import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import Footer from "./Footer";

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
    await db
      .collection("admin")
      .doc(`${window.location.pathname.split("/")[2]}`)
      .collection("foodMenu")
      .doc(`${name}`)
      .set({
        name: name,
        type: type,
        price: price,
        description: description,
      });
    toast.success(`${name} added to menu!`);
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
            history.push(
              `/admin-menu/${window.location.pathname.split("/")[2]}`
            )
          }
          className="button"
        >
          Back to Menu
        </button>
      </nav>
      <form onSubmit={handleSubmit} id="form" className="form">
        <div className="row">
          <div className="food_name col">
            <input
              type="text"
              placeholder="Enter food name..."
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </div>
          <div className="price col">
            <input
              type="tel"
              placeholder="Enter food price..."
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="type">
          {/* <input
            type="text"
            placeholder="Enter food type..."
            onChange={(e) => setType(e.target.value)}
          /> */}
          <select
            placeholder="Select food type..."
            name="type"
            id="type"
            onChange={(e) => {
              let value = e.target.value;
              setType(value);
            }}
          >
            <option value="Snacks">Snacks</option>
            <option value="Lunch">Lunch</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>
        <div className="desc">
          <input
            type="text"
            placeholder="Enter food description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="button">Add</button>
      </form>
      <Footer />
    </div>
  );
}

export default SeparateFoodMenuNew;
