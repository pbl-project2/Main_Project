import { Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import "../Styling/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(total);
  const [sales, setSales] = useState(sum);
  const [orders, setOrders] = useState(0);

  const history = useHistory();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    db.collection("users")
      .doc(`${localStorage.getItem("userId")}`)
      .collection("food")
      .orderBy("id", "asc")
      .onSnapshot((snapshot) => {
        let cartArr = [];
        snapshot.forEach((doc) => {
          cartArr.push({ ...doc.data(), id: doc.id });
        });
        setCart(cartArr);
        let sumPrice = 0;
        for (let i = 0; i < cartArr.length; i++) {
          sumPrice += cartArr[i].price;
          setTotal(sumPrice);
        }
        setSum(sumPrice);
        db.collection("users")
          .doc(`${localStorage.getItem("userId")}`)
          .update({
            total: sumPrice,
          });
      });
  }, [db]);

  const handleDelete = async (id) => {
    await db
      .collection("users")
      .doc(`${userId}`)
      .collection("food")
      .doc(`${id}`)
      .delete();
  };

  const handleCheckout = async () => {
    await db.collection("users").doc(`${userId}`).set({
      name: sessionStorage.getItem("name"),
      mobile: sessionStorage.getItem("mobile"),
      total: sum,
      token: sessionStorage.getItem("token"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      id: userId,
      email: window.location.pathname.split("/")[2],
    });
    setSales(firebase.firestore.FieldValue.increment(sum));
    setOrders(firebase.firestore.FieldValue.increment(1));
    await db.collection("admin").doc("details").update({
      orders: firebase.firestore.FieldValue.increment(1),
      sales: firebase.firestore.FieldValue.increment(sum),
    });
    history.push(`/bill/${window.location.pathname.split("/")[2]}/${userId}`);
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
                <div className="quantity-cart">
                  <p>x {item.quantity}</p>
                </div>
                <div className="price">
                  <p>₹{item.price}</p>
                </div>
                <Cancel onClick={() => handleDelete(item.id)} />
              </div>
            </>
          ))
        : "Your Cart is empty right now..."}
      <div>
        {sum > 0 ? (
          <>
            <h3>Total: ₹{sum}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
