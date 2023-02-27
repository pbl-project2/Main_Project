import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import { FadeLoader } from "react-spinners";
import { Cancel } from "@mui/icons-material";
import "../Styling/CartSeparate.css";

function CartSeparate() {
  var userId = sessionStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(total);
  const [loading, setLoading] = useState(false);
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
        setCart(cartArr);
        setLoading(true);
        let sumPrice = 0;
        for (let i = 0; i < cartArr.length; i++) {
          sumPrice += cartArr[i].price;
          setTotal(sumPrice);
        }
        setSum(sumPrice);
        db.collection("users")
          .doc(`${global.sessionStorage.getItem("userId")}`)
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
    await db
      .collection("users")
      .doc(`${userId}`)
      .set({
        name: sessionStorage.getItem("name"),
        mobile: sessionStorage.getItem("mobile"),
        total: sum,
        token: sessionStorage.getItem("token"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: userId,
        completed: false,
        email: window.location.pathname.split("/")[2],
      });
    // setSales(firebase.firestore.FieldValue.increment(sum));
    // setOrders(firebase.firestore.FieldValue.increment(1));
    await db
      .collection("admin")
      .doc("details")
      .update({
        orders: firebase.firestore.FieldValue.increment(1),
        sales: firebase.firestore.FieldValue.increment(sum),
      });
    history.push(`/bill/${sessionStorage.getItem("adminEmail")}/${userId}`);
  };

  return (
    <>
      <div className="cart-nav">
        <img src={require("../Components/pjwrffba.jpg")} alt=""  className="logo-nav-cart"/>
        <button
          className="cart-back-btn"
          onClick={() =>
            history.replace(
              `/foodmenu/${window.location.pathname.split("/")[2]}`
            )
          }
        >
          Back
        </button>
      </div>
      <div className="cart-main1">
        <div className="main-cart-sep">
          <div className="container">
            <h3>YOUR CART</h3>
            {loading ? (
              cart.length > 0 ? (
                cart.map((item) => (
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
                      <Cancel
                        className="cancel-btn"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </>
                ))
              ) : (
                "Your Cart is empty right now..."
              )
            ) : (
              <div>
                <FadeLoader size={150} color="#fff" />
              </div>
            )}
            <div className="sum">
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
        </div>
      </div>
    </>
  );
}

export default CartSeparate;
