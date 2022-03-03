import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../Styling/FoodMenu.css";
import FoodCard from "./FoodCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "./Cart";
import { useHistory } from "react-router-dom";
import { data } from "../data";
import { db } from "../firebase/firebase";

const FoodMenu = ({props}) => {
  const history = useHistory();
  const [food, setFood] = useState([]);
  useEffect(() => {
    db.collection("foodMenu").onSnapshot((snapshot) => {
      let foodArr = [];
      snapshot.forEach((doc) => {
        foodArr.push({ ...doc.data(), id: doc.id });
      });
      setFood(foodArr);
      console.log(foodArr);
    });
  }, [db]);
  return (
    <div className="food-menu">
      <div className="nav">
        <h3>UpMenu</h3>
        <div>
          <button className="Cart-link">
            <AddShoppingCartIcon />
          </button>
          <button onClick={() => history.replace("/")} className="home-btn">
            Home Page
          </button>
        </div>
      </div>
      <h3 className="main-title">Food Menu</h3>

      <hr />
      <div className="food-cards">
        <div className="categories">
          <a href="#" className="category">
            Breakfast
          </a>
          <a href="#" className="category">
            Lunch
          </a>
          <a href="#" className="category">
            Beverages
          </a>
        </div>
        <div className="food-card-list">  
          {food.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              type={item.type}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
        <Cart  />
      </div>
    </div>
  );
};

export default FoodMenu;
