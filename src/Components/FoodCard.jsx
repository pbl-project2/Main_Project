import React from "react";
import "../Styling/FoodMenu.css";

const FoodCard = (props) => {
  const array = [];
  const food = {};
  const foodObj = {
    name: "",
    price: "",
  };
  const handleClick = () => {
    foodObj.name = props.name;
    foodObj.price = props.price;
    Object.assign(food, foodObj);
    let map = new Map(Object.entries(foodObj));
    const finalMap = new Map([...map, map]);
    console.log("Map", map);
    console.log("Final Map", finalMap);
    // console.log(food);
    // console.log(foodObj);
  };
  return (
    <div className="food-card">
      {/* <div class="vl"></div> */}
      <div className="card-info">
        <div className="card-1">
          <h3 className="food-title">{props.name}</h3>
          <div className="price">₹{props.price}</div>
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
