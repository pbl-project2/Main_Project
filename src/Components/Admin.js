import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import "../Styling/Admin.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "../Components/AdminNav";
import CustomerData from "./CustomerData";
import QRCode from "qrcode";
import Footer from "./Footer";
import firebase from "firebase";

function Admin({ user, handleDelete, admin }) {
  const [food, setFood] = useState([]);
  // const [finalArr, setFinalArr] = useState([]);
  const [adminDetails, setAdminDetails] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [finalSales, setFinalSales] = useState(0);
  const [finalOrders, setFinalOrders] = useState(0);
  const [total, setTotal] = useState(0);
  // useEffect(async () => {
  //   await db
  //     .collection("users")
  //     .where("email", "==", window.location.pathname.split("/")[2])
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) => {
  //       let userArr = [];
  //       snapshot.forEach((doc) => {
  //         userArr.push({ ...doc.data(), id: doc.id });
  //       });
  //       setUsers(userArr);
  //       console.log(userArr);
  //       localStorage.setItem("userId", users.id);
  //     });
  // }, [db]);
  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let userArr = [];
        snapshot.forEach((doc) => {
          if (admin.email === doc.data().email) {
            userArr.push({ ...doc.data(), id: doc.id });
            setTotal(doc.data().total);
          }
        });
        setUsers(userArr);
        // console.log(uscerArr);
        // localStorage.setItem("userId", users.id);
        localStorage.setItem("userId", users.id);
      });
  }, [db]);

  useEffect(() => {
    db.collection("users")
      .doc(`${user.id}`)
      .collection("food")
      .onSnapshot((snapshot) => {
        let foodArr = [];
        snapshot.forEach((doc) => {
          foodArr.push({ ...doc.data(), id: doc.id });
        });
        setFood(foodArr);
        // console.log("FOOD ARR: ", foodArr);
      });
  }, [db]);

  useEffect(() => {
    db.collection("admin")
      .doc(`${admin.email}`)
      .get()
      .then((docs) => {
        let arr = [docs.data()];
        setAdminDetails(arr);
        setAdminEmail(arr[0].email);
        localStorage.setItem("finalSales", arr[0].sales);
        localStorage.setItem("finalOrders", arr[0].orders);
        setFinalSales(arr[0].sales);
        setFinalOrders(arr[0].orders);
        localStorage.setItem("adminEmail", arr[0].email);
        // console.log("ADMIN DETAILS: ", arr);
        // console.log("ADMIN Name: ", arr[0].email);
      });
  }, [db]);

  useEffect(async () => {
    await QRCode.toDataURL(
      // `http://localhost:3000/foodmenu/${adminDetails[0].email}`
      `http://${window.location.host}/customer-login/${localStorage.getItem(
        "adminEmail"
      )}`
      // `http://${window.location.hostname}:${window.location.port}/customer-login/${localStorage.getItem(
      //   "adminEmail")}`
    ).then((data) => {
      localStorage.setItem("src", data);
      db.collection("admin").doc(`${admin.email}`).update({
        qrcode: data,
      });
    });
  }, [adminDetails]);

  const handleDeleteNew = async (id) => {
    await db.collection("users")
      .doc(`${id}`)
      .get()
      .then((doc) => {
        localStorage.setItem("total", doc.data().total);
        localStorage.setItem("orders1", orders+1);
      });
    await db.collection("users").doc(`${id}`).delete();
  };

  useEffect(() => {
    db.collection("admin")
      .doc(`${admin.email}`)
      .update({
        sales: finalSales,
        orders: finalOrders,
      });
  }, [localStorage.getItem("finalSales")]);

  useEffect(() => {
    db.collection("admin")
      .doc(`${admin.email}`)
      .get()
      .then((doc) => {
        let arr = [doc.data()];
        localStorage.setItem("Sales", arr[0].sales);
        localStorage.setItem("Orders", arr[0].orders);
      });
  }, [db]);

  // useEffect(() => {
  //   QRCode.toDataURL(`http://localhost:3000/foodmenu/${admin.email}`).then(
  //     (data) => {
  //       localStorage.setItem("src", data);
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   db.collection("admin")
  //     .doc("details")
  //     .get()
  //     .then((doc) => {
  //       let arr = [];
  //       arr.push(doc.data());
  //       setFinalArr(arr);
  //       // console.log("ARR: ", arr);
  //     });
  // }, []);

  // const [adminName, setAdminName] = useState("");

  // useEffect(() => {
  //   console.log("ADMIN: ", admin);
  //   let name = "";
  //   console.log(admin.email);
  //   db.collection("admin")
  //     .doc(`${admin.email}`)
  //     .onSnapshot((doc) => {
  //       name = doc.data().name;
  //       setAdminName(name);
  //     });
  // }, [db]);

  return (
    <>
      <AdminNav admin={admin} adminEmail={adminEmail} user={user} />
      <div className="upper-body container">
        {/* For income and orders served */}
        <div className=" divs-combine row">
          <div className="income col">
            <h1>You've Earned</h1>
            <h3>Sales: ₹{localStorage.getItem("total")}.00</h3>
            {/* <h1>Orders Served: {orders}</h1> */}
          </div>
          <div className="served-orders col">
            <h1>You've Served</h1>
            {/* <h1>Sales: ₹{sales}</h1> */}
            <h3>{localStorage.getItem("orders1")} orders</h3>
          </div>
        </div>
        {/* <h1>Admin Details</h1> */}
      </div>
      {/* {users.length === 0 ? (
        <p className="orders-title">It's calm for right now!!</p>
      ) : (
        <> */}
      {users.length === 0 ? (
        <p className="orders-title">It's calm for right now!!</p>
      ) : (
        <>
          <p className="orders-title">
            You need to serve these orders...Hurry Up!
          </p>
          <div className="all-orders">
            {/* For customer data */}
            {users?.map((user) => (
              <CustomerData
                key={user.id}
                user={user}
                handleDelete={handleDelete}
                handleDeleteNew={handleDeleteNew}
                food={food}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default Admin;
