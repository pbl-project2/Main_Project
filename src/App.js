import "./App.css";
import React, { useEffect, useState } from "react";
import UserLogin from "./Components/UserLogin.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FoodMenu from "./Components/FoodMenu";
import Admin from "./Components/Admin";
import { db } from "./firebase/firebase";
import Customer from "./Components/Customer";
import Bill from "./Components/Bill";
import { v4 as uuid } from "uuid";
import AdminMenu from "./Components/AdminMenu";
import MenuNew from "./Components/MenuNew";
import firebase from "firebase";
import EditFood from "./Components/EditFood";
import AdminLogin from "./Components/AdminLogin";
import SeparateFoodMenuNew from "./Components/SeparateFoodMenuNew";
import AdminMenuSeparate from "./Components/AdminMenuSeparate";
import ContactUs from "./Components/ContactUs";
import QRCodeScanner from "./Components/QRCodeScanner";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartSeparate from "./Components/CartSeparate";
import AboutUs from "./Components/AboutUs";
import Analytics from "./Components/Analytics";
import PaymentsQrScanner from "./Components/PaymentsQrScanner";

function App() {
  const [users, setUsers] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [salesArr, setSalesArr] = useState([]);
  const [emailUsers, setEmailUsers] = useState([]);
  // const [sales, setSales] = useState(0);
  var sales = 0;
  const [orders, setOrders] = useState(0);
  var salesnew = 0;
  //On page refresh...
  useEffect(() => {
    const sale = localStorage.getItem("salesnew");
    const order = localStorage.getItem("ordersnew");
    db.collection("admin")
      .doc(`${localStorage.getItem("adminEmail")}`)
      .update({
        sales: sale,
        orders: order,
      });
  }, []);

  // useEffect(() => {
  //   salesnew = sessionStorage.getItem("salesnew");
  // }, []);

  useEffect(async () => {
    await db
      .collection("users")
      .orderBy("timestamp", "asc")
      .where("email", "==", window.location.pathname.split("/")[2])
      .onSnapshot((snapshot) => {
        let userArr = [];
        snapshot.forEach((doc) => {
          userArr.push({ ...doc.data(), id: doc.id });
        });
        setUsers(userArr);
        // console.log(userArr);
        localStorage.setItem("userId", users.id);
      });
  }, [db]);

  // useEffect(() => {
  //   db.collection("users")
  //     .orderBy("timestamp", "asc")
  //     .where("email", "==", window.location.pathname.split("/")[2])
  //     .onSnapshot((snapshot) => {
  //       let userArr = [];
  //       snapshot.forEach((doc) => {
  //         userArr.push({ ...doc.data(), id: doc.id });
  //       });
  //       // console.log(userArr);
  //       setUsers(userArr);
  //       localStorage.setItem("usersID", users.id);
  //     });
  // }, [db]);

  const handleDelete = async (id) => {
    // await db
    //   .collection("users")
    //   .doc(id)
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       console.log(doc.data().total);
    //       sales+= doc.data().total;
    //       sessionStorage.setItem("salesnew", sales);
    //       console.log(sales);
    //       // console.log("Salesnew: ",sales);
    //       // sessionStorage.setItem("salesnew", salesnew);
    //       console.log(`${localStorage.getItem("adminEmail")}`);
    //       db.collection("admin")
    //         .doc(`${localStorage.getItem("adminEmail")}`)
    //         .update({
    //           sales: sessionStorage.getItem("salesnew"),
    //         });
    //     } else {
    //       console.log("No such document!");
    //     }
    //   });
    toast.success(`Order completed!!`, {
      autoClose: 2000,
    });
    // await db.collection("users").doc(`${id}`).delete();
    await db.collection("users").doc(`${id}`).update({
      completed: true,
    });
    await db.collection("users").where("completed", "==", true).get().then((snapshot) => {
      let usersArr = [];
      snapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsersArr(usersArr);
      setSalesArr(usersArr[0].total);
      usersArr.forEach(user => {
        sales += user.total;
        db.collection("admin").doc(`${localStorage.getItem("adminEmail")}`).update({
          sales: sales,
        });
        sessionStorage.setItem("sales", sales);
      });
      console.log(sales);
    });
    // await db
    //   .collection("users")
    //   .where("completed", "==", true)
    //   .get()
    //   .then((snapshot) => {
    //     let userArr = [];
    //     snapshot.forEach((doc) => {
    //       if (doc.data().email === localStorage.getItem("adminEmail")) {
    //         userArr.push({ ...doc.data(), id: doc.id });
    //       }
    //     });
    //     setUsersArr(userArr);
    //     console.log(userArr);
    //     setSalesArr(userArr[0].total);
    //     userArr.forEach((user) => {
    //       sales += user.total;
    //       localStorage.setItem("salesFinal", sales);
    //     });
    //     console.log(sales);
    //   });
  };
  useEffect(async () => {
    await db
      .collection("admin")
      .doc(`${localStorage.getItem("adminEmail")}`)
      .update({
        sales: localStorage.getItem("salesFinal"),
      });
  }, [db]);

  let id = uuid();
  localStorage.setItem("o", id);
  return (
    <div className="app">
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/">
            <UserLogin />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/qrcode-scan">
            <QRCodeScanner />
          </Route>
          <Route path="/customer-login">
            <Customer />
          </Route>
          <Route path="/foodmenu">
            <FoodMenu />
          </Route>
          <Route path={`/admin`}>
            <Admin
              // user={users}
              // sales={sales}
              // orders={order}
              usersArr={usersArr}
              sales={sales}
              handleDelete={handleDelete}
            />
            <div className="container">
              {/* <h2>Income: ₹{income} </h2>
              <h2>Orders: {order}</h2>
              <h2>Orders Served: {order}</h2> */}
              {/* {users.map((user) => (
                <Admin
                  key={user.id}
                  user={user}
                  
                />
              ))} */}
            </div>
          </Route>
          {/* <Route path="/details">
            <AdminDetails income={income} order={order} />
          </Route> */}
          <Route path="/menu">
            <AdminMenu />
          </Route>
          <Route path="/new">
            <MenuNew />
          </Route>
          <Route path="/edit">
            <EditFood />
          </Route>
          <Route path="/admin-login">
            <AdminLogin users={users} handleDelete={handleDelete} />
          </Route>
          <Route path="/bill">
            <Bill />
          </Route>
          <Route path="/admin-menu">
            <AdminMenuSeparate />
          </Route>
          <Route path="/food-new">
            <SeparateFoodMenuNew />
          </Route>
          <Route path="/contact-us">
            <ContactUs />
          </Route>
          <Route path="/cart">
            <CartSeparate />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
          <Route path="/payments">
            <PaymentsQrScanner />
          </Route>
        </Switch>
      </Router>
      {/* <Routes>
        <Route path="/FoodMenu" element={<FoodMenu />} />
        <Route exact path="/" element={<UserLogin />} />
        <Route path="/admin">
          <h1>Hi Admin</h1>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
