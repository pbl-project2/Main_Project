import { AddAlarm, Dvr } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "../Styling/Analytics.css";
import AnalyticsUserData from "./AnalyticsUserData";
function Analytics() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState(0);
  const [date, setDate] = useState("");
  const [timestampDate, setTimestampDate] = useState("");
  const [timestampUsers, setTimestampUsers] = useState([]);
  const [timestampOrders, setTimestampOrders] = useState(0);
  const [timestampSales, setTimestampSales] = useState(0);
  var sales = 0;
  const [adminSales, setAdminSales] = useState(sales);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let usersArr = [];
        snapshot.forEach((doc) => {
          if (
            doc.data().completed === true &&
            doc.data().email === window.location.pathname.split("/")[2]
          ) {
            usersArr.push({ ...doc.data(), id: doc.id });
            // console.log(doc.data().total);
            // console.log(doc.data().timestamp.toDate().toISOString().split("T")[0]);
            sales += doc.data().total;
          }
          setUsers(usersArr);
          setOrders(usersArr.length);
          db.collection("admin")
            .doc(`${window.location.pathname.split("/")[2]}`)
            .update({
              sales: sales,
            });
          console.log(usersArr);
        });
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let usersArr = [];
        snapshot.forEach((doc) => {
          setTimestampDate(
            doc.data().timestamp.toDate().toISOString().split("T")[0]
          );
          console.log(
            doc.data().timestamp.toDate().toISOString().split("T")[0]
          );
          if (timestampDate === date) {
            usersArr.push({ ...doc.data(), id: doc.id });
            sales += doc.data().total;
          }
          setTimestampUsers(usersArr);
          setTimestampOrders(usersArr.length);
          console.log(usersArr);
        });
      });
  }, [date]);

  useEffect(() => {
    db.collection("admin")
      .doc(`${window.location.pathname.split("/")[2]}`)
      .onSnapshot((snapshot) => {
        setAdminSales(snapshot.data().sales);
      });
  }, []);

  useEffect(() => {
    let sales = 0;
    let usersArr = [];
    let orders = 0;
    usersArr = users.filter(
      (user) => user.timestamp.toDate().toISOString().split("T")[0] === date
    );
    setTimestampUsers(usersArr);
    console.log(usersArr);
    orders = usersArr.length;
    usersArr.forEach((user) => {
      console.log(user.total);
      sales += user.total;
    });
	console.log(sales);
    setTimestampSales(sales);
  }, [date]);
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 60000);

  return (
    <div className="main_analytics">
      <div className="analytics">
        <nav>
          <h3>UpMenu</h3>
          <div className="right">
            <button
              className="login-btn"
              onClick={() =>
                history.push(
                  `/admin-login/${window.location.pathname.split("/")[2]}`
                )
              }
            >
              Back
            </button>
          </div>
        </nav>

        <div className="divs-combine row">
          <div className="income col">
            <h1>{timestampSales>0 ? `Sales on ${date}` : "Your Sales"}</h1>
            {/* <h3>{adminSales}</h3> */}
			<h3>{timestampSales}</h3>
          </div>
          <div className="served-orders col">
            <h1>Orders Served</h1>
            <h3>{timestampOrders ? timestampOrders : orders}</h3>
          </div>
          <div className="input_Date div-combine col">
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="main_orders">
          <div className="orders">
            {date
              ? users
                  .filter(
                    (user) =>
                      user.timestamp.toDate().toISOString().split("T")[0] ===
                      date
                  )
                  .map((user) => {
                    if (users.length === 0) return "No orders found";
                    else return <AnalyticsUserData key={user.id} user={user} />;
                  })
              : users.map((user) => (
                  <AnalyticsUserData key={user.id} user={user} />
                ))}
            {/* {date ? (
              users.filter(
                (user) =>
                  user.timestamp.toDate().toISOString().split("T")[0] === date
              ).length === 0 ? (
                <h4
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: "50px",
                  }}
                >
                  Sorry, no orders found on date <span>{date}</span>
                </h4>
              ) : (
                users.map((user) => (
                  <AnalyticsUserData key={user.id} user={user} />
                ))
              )
            ) : (
              users.map((user) => (
                <AnalyticsUserData key={user.id} user={user} />
              ))
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
