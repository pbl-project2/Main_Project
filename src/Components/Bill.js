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
        //   console.log(doc.data());
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
        // console.log(billArr);
        setFood(billArr);
        // console.log("BILLARR: ", food);
      });
  }, [db]);

  const generatePdf = () => {
    var doc = new jsPDF('p', "pt", "a4");
    doc.text(275,90, "BILL");
    doc.text(100,120, `Name: ${name}`);
    doc.text(100,140, `Token: #${token}`);
    doc.text(100,160, `Total: Rs.${total}`);
    doc.text(100,200, `Food items:\n${food.map((food) => {
      return `Name: ${food.name}\nQuantity: ${food.quantity}\nPrice: Rs.${food.price}\n\n`
    })}`);
    doc.save(`bill/${token}.pdf`);
  };

  return (
    <>
      <div className="admin-nav">
        <nav>
          <h3>UpMenu</h3>
          <button className="login-btn" onClick={handleClick}>
            Home Page
          </button>
        </nav>
      </div>
      <div className="whole-bill">
        <div className="bill">
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
          <button className="login-btn" onClick={generatePdf}>Generate PDF</button>
        </div>
      </div>
    </>
  );
}

export default Bill;
