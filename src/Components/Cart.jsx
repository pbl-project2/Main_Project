import { Cancel, DvrTwoTone } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import "../Styling/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(total);
  const userId = localStorage.getItem("userId");
  const history = useHistory();

  useEffect(() => {
    db.collection("users")
      .doc(`${userId}`)
      .collection("food")
      .orderBy("id", "asc")
      .onSnapshot((snapshot) => {
        let cartArr = [];
        snapshot.forEach((doc) => {
          cartArr.push({ ...doc.data(), id: doc.id });
        });
        // console.log("ARRAY: ", cartArr);
        setCart(cartArr);
        // console.log("CART: ", cartArr);
        // console.log("Length: ", cartArr.length);
        let sumPrice = 0;
        for (let i = 0; i < cartArr.length; i++) {
          sumPrice += cartArr[i].price;
          setTotal(sumPrice);
          // console.log("SUM: ", sumPrice);
        }
        setSum(sumPrice);
        db.collection("users").doc(`${userId}`).update({
          total: sumPrice,
        });
        // console.log("SUM1: ", sumPrice);
      });
  }, [db]);

  const handleDelete = async (id) => {
    await db
      .collection("users")
      .doc(`${userId}`)
      .collection("food")
      .doc(`${id}`)
      .delete();
    // alert("Item Deleted");
  };
  return (
    <div className="main-cart">
      <h3 className="title">Your Cart</h3>
      {cart.length > 0
        ? cart.map((item) => (
            <>
              <div className="cart_items">
                <div className="name">
                  <p>{item.name}</p>
                </div>
                <div className="quantity">
                  <p>{item.quantity}No.</p>
                </div>
                <div className="price">
                  <p>₹{item.price}</p>
                </div>
                <Cancel onClick={() => handleDelete(item.id)} />
              </div>
            </>
          ))
        : "Your Cart is empty right now..."}
      <h3>Total: ₹{sum}</h3>
      <div>
        {sum > 0 ? (
          <>
            <button
              className="checkout-btn"
              onClick={() => history.push(`/bill/${userId}`)}
            >
              CHECKOUT
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
