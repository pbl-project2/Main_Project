import React from "react";
import "../Styling/FoodMenu.css";

const FoodCard = (props) => {
  return (
    <div className="food-card">
      {/* <div class="vl"></div> */}
      <div className="card-info">
        <div className="card-1">
          <h3 className="food-title">{props.name}</h3>
          <div className="price">₹{props.price}</div>
          <p className="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, nam.
          </p>
          <hr className="card-diversion" />
        </div>
        <div>
          <button className="add-btn">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
