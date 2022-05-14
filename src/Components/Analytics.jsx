import { AddAlarm, Dvr } from "@mui/icons-material";
import { ShadingPattern } from "jspdf";
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

  // useEffect(() => {
  //   db.collection("users")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       let usersArr = [];
  //       snapshot.forEach((doc) => {
  //         setTimestampDate(
  //           doc.data().timestamp.toDate().toISOString().split("T")[0]
  //         );
  //         console.log(
  //           doc.data().timestamp.toDate().toISOString().split("T")[0]
  //         );
  //         if (timestampDate === date) {
  //           usersArr.push({ ...doc.data(), id: doc.id });
  //           sales += doc.data().total;
  //         }
  //         setTimestampUsers(usersArr);
  //         setTimestampOrders(usersArr.length);
  //         console.log(usersArr);
  //       });
  //     });
  // }, [date]);

  useEffect(() => {
    db.collection("admin")
      .doc(`${window.location.pathname.split("/")[2]}`)
      .onSnapshot((snapshot) => {
        setAdminSales(snapshot.data().sales);
      });
  }, []);

  // useEffect(() => {
  //   let sales = 0;
  //   let usersArr = [];
  //   let orders = 0;
  //   usersArr = users.filter(
  //     (user) => user.timestamp.toDate().toISOString().split("T")[0] === date
  //   );
  //   setTimestampUsers(usersArr);
  //   console.log(usersArr);
  //   orders = usersArr.length;
  //   usersArr.forEach((user) => {
  //     console.log(user.total);
  //     sales += user.total;
  //   });
  //   console.log(sales);
  //   setTimestampSales(sales);
  // }, [date]);
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 60000);

  useEffect(() => {
    let sales = 0;
    let orders = 0;
    let usersArr = [];
    let timestampdate = date;
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.forEach((user) => {
          if (
            user.data().timestamp.toDate().toISOString().split("T")[0] ===
            timestampdate
          ) {
            usersArr.push({ ...user.data(), id: user.id });
            sales += user.data().total;
            orders += 1;
            console.log(usersArr);
            console.log(sales);
            console.log(orders);
          }
        });
        setTimestampUsers(usersArr);
        setTimestampSales(sales);
        setTimestampOrders(orders);
      });
  }, [date]);

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

        {date ? (
          <>
            <div className="divs-combine row">
              <div className="income col">
                <h2>Your Sales</h2>
                <h3>{timestampSales}</h3>
              </div>
              <div className="served-orders col">
                <h2>Orders served</h2>

                <h3>{timestampOrders}</h3>
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
                {timestampUsers.map((user) => (
                  <AnalyticsUserData key={user.id} user={user} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="divs-combine row">
              <div className="income col">
                <h1>Your Sales</h1>
                <h3>{adminSales}</h3>
              </div>
              <div className="served-orders col">
                <h1>Orders Served</h1>
                <h3>{orders}</h3>
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
                {users.map((user) => (
                  <AnalyticsUserData key={user.id} user={user} />
                ))}
              </div>
            </div>
          </>
        )}
        {/* {date
          ? timestampUsers.map((user) => (
              <AnalyticsUserData key={user.id} user={user} />
            ))
          : users.map((user) => (
              <AnalyticsUserData key={user.id} user={user} />
            ))} */}
        {/* <div className="divs-combine row">
          <div className="income col">
            <h1>Your Sales</h1>
            <h3>{adminSales}</h3>
          </div>
          <div className="served-orders col">
            <h1>Orders Served</h1>
            <h3>{orders}</h3>
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
        </div> */}
        {/* <div className="main_orders">
          <div className="orders"></div>
        </div> */}
      </div>
    </div>
  );
}

export default Analytics;
