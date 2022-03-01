import { Cancel } from "@mui/icons-material";
import React from "react";
import "../Styling/CartItems.css";

function CartItems({ props }) {
  return (
    <div className="cart_items">
      <div className="name">
        <p>{props.name}</p>
      </div>
      <div className="price">
        <p>{props.price}</p>
      </div>
      <Cancel onClick={props.handleDelete} />
    </div>
  );
}

export default CartItems;
