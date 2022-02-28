import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Styling/FoodMenu.css";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "./Cart"

const FoodMenu = () => {
  const home = useNavigate();

  return (
    <div className="food-menu">
      <div className="nav">
        <h3>UpMenu</h3>
        <div>
          <button className="Cart-link">
            <AddShoppingCartIcon />
          </button>
          <button onClick={() => home("/")} className="home-btn">
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
          <FoodCard name="Poha" price="40" />
          <FoodCard name="Upma" price="35" />
          <FoodCard name="Misal" price="70" />
          <FoodCard name="Vadapav" price="15" />
          <FoodCard name="Lassi" price="12" />
        </div>
        <Cart></Cart>
      </div>
    </div>
  );
};

export default FoodMenu;
