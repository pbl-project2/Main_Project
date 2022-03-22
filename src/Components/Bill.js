import React, { useDebugValue, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styling/Login.css";
import "../Styling/Bill.css";
import { db } from "../firebase/firebase";
import jsPDF from "jspdf";
import ReactStars from "react-rating-stars-component";
import { Download } from "@mui/icons-material";
import firebase from "firebase";

function Bill() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [total, setTotal] = useState(0);
  const [food, setFood] = useState([]);
  const [rating, setRating] = useState(null);
  const [fivestars, setFivestars] = useState(0);
  const [fourstars, setFourstars] = useState(0);
  const [threestars, setThreestars] = useState(0);
  const [twostars, setTwostars] = useState(0);
  const [onestars, setOnestars] = useState(0);
  const handleClick = () => {
    history.push("/");
  };

  useEffect(async () => {
    await db // user details
      .collection("users")
      .doc(`${window.location.pathname.split("/")[3]}`)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setToken(doc.data().token);
        setTotal(doc.data().total);
      });

    db.collection("users")
      .doc(`${window.location.pathname.split("/")[3]}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let billArr = [];
        snapshot.forEach((doc) => {
          billArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(billArr);
      });
  }, [db]);

  useEffect(() => {
    db.collection('users').doc(`${window.location.pathname.split("/")[3]}`).update({
      rating: rating
    });
    if(rating === 5) {
      let rating = firebase.firestore.FieldValue.increment(1);
      db.collection('ratings').doc("5 stars").update({
        rating: rating
      })
    }
    else if(rating === 4) {
      let rating = firebase.firestore.FieldValue.increment(1);
      db.collection('ratings').doc("4 stars").update({
        rating: rating
      })
    }
    else if(rating === 3) {
      let rating = firebase.firestore.FieldValue.increment(1);
      db.collection('ratings').doc("3 stars").update({
        rating: rating
      })
    }
    else if(rating === 2) {
      let rating = firebase.firestore.FieldValue.increment(1);
      db.collection('ratings').doc("2 stars").update({
        rating: rating
      })
    }
    else if(rating === 1) {
      let rating = firebase.firestore.FieldValue.increment(1);
      db.collection('ratings').doc("1 stars").update({
        rating: rating
      })
    }
  }, [rating]);

  const generatePdf = () => {
    var doc = new jsPDF("portrait", "px", "a4");

    doc.setFontSize(22);
    doc.setTextColor("#a03989");

    doc.text("CANTEEN TOKEN SYSTEM", 120, 30);
    doc.text(
      "__________________________________________________________________",
      0,
      40
    );

    doc.setFontSize(10);
    doc.setTextColor("black");
    doc.text(50, 60, `Date & Time: ${new Date().toLocaleString()}`);

    doc.setFontSize(14);
    doc.setTextColor("black");
    doc.text(50, 120, `Name: ${name}`);

    doc.text(50, 140, `Token: #${token}`);
    doc.text(50, 160, `Total: Rs.${total}`);

    doc.setFontSize(16);
    doc.setTextColor("#a03989");
    doc.text(50, 200, "Food Items");
    doc.text(
      50,
      220,
      `${food.map((food) => {
        return `Name: ${food.name}\nQuantity: ${food.quantity}\nPrice: Rs.${food.price}\n\n`;
      })}`
    );

    doc.setTextColor("gray");
    doc.setFontSize(18);
    doc.text(`Please pay Rs.${total} at the canteen`, 50, 590);

    doc.setFontSize(14);
    doc.setTextColor("black");
    doc.text(
      "______________________________________________________________________________",
      0,
      600
    );
    doc.text("Thank you for using our system", 150, 620);
    doc.save(`bill/${token}.pdf`);
  };

  return (
    <>
      <div className="admin-nav">
        <nav>
          <h3>
            Up<span>Menu</span>
          </h3>
          <button className="login-btn" onClick={() => history.push("/contact-us")}>Contact Us</button>
          <button className="login-btn" onClick={handleClick}>
            Home Page
          </button>
        </nav>
      </div>
      <div className="whole-bill ">
        <div className="bill col">
          <h1 className="bill-title">Billing</h1>
          <hr />
          <h1 className="token-num" style={{ color: "red" }}>
            #{token}
          </h1>
          <h1>Name: {name}</h1>
          {food.map((item) => (
            <>
              <div className="bill-food-items">
                <p className="food-items">{item.name}</p>
                <p className="food-items"> x {item.quantity}</p>
                <p className="food-items">₹{item.price}</p>
              </div>
            </>
          ))}
          <h1 className="total">Total: ₹{total}</h1>
          <p className="messege">**PAY AT THE CANTEEN**</p>
          <button className="login-btn pdf-btn" onClick={generatePdf}>
            Download PDF <Download />
          </button>
        </div>
        <div className="rating-div col">
          <div className="rate-us">
            <div className="question-div">
              <h3>Did You Like Our Site?</h3>
              <h5>Wanna rate it?</h5>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="star-rating">
                  {/* <span class="fa fa-star-o" data-rating="1"></span>
                  <span class="fa fa-star-o" data-rating="2"></span>
                  <span class="fa fa-star-o" data-rating="3"></span>
                  <span class="fa fa-star-o" data-rating="4"></span>
                  <span class="fa fa-star-o" data-rating="5"></span>
                  <input
                    type="hidden"
                    name="whatever1"
                    class="rating-value"
                    value="2.56"
                  /> */}
                  {/* <StarRating /> */}
                  <ReactStars
                    count={5}
                    onChange={(value) => setRating(value)}
                    size={100}
                    activeColor={"#0072b1"}
                  />
                  {rating ? <h3>Thank you for rating us</h3> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
