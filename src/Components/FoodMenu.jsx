import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Styling/FoodMenu.css";
import FoodCard from "./FoodCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "./Cart";
import { useHistory } from "react-router-dom";
import { foodMenu } from "../FoodMenu";

const FoodMenu = ({props}) => {
  const history = useHistory();

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
          {foodMenu.map((item) => (
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
