import { Cancel } from "@mui/icons-material";
import React from "react";
import "../Styling/Cart.css";

function CartItems({ props }) {
  
  return (
    <div className="cart_items">
      <p>{props.name}</p>
      <p>{props.price}</p>
      <Cancel onClick={props.handleDelete} />
    </div>
  );
}

export default CartItems;
