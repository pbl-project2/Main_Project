import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styling/Login.css";
import "../Styling/Bill.css";
import { db } from "../firebase/firebase";
import jsPDF from "jspdf";

function Bill() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [total, setTotal] = useState(0);
  const [food, setFood] = useState([]);

  const handleClick = () => {
    history.push("/");
  };

  useEffect(async () => {
    await db // user details
      .collection("users")
      .doc(`${localStorage.getItem("userId")}`)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setToken(doc.data().token);
        setTotal(doc.data().total);
      });

    db.collection("users")
      .doc(`${localStorage.getItem("userId")}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let billArr = [];
        snapshot.forEach((doc) => {
          billArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(billArr);
      });
  }, [db]);

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
    doc.setTextColor("white");
    // doc.text(`Date & Time: ${new Date().toLocaleString()}`, 290, 60);
    doc.text(`Date & Time: ${new Date().toLocaleString()}`, 290, 60);

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
          <button className="login-btn" onClick={generatePdf}>
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default Bill;
