import "./App.css";
import React, { useEffect, useState } from "react";
import UserLogin from "./Components/UserLogin.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FoodMenu from "./Components/FoodMenu";
import Admin from "./Components/Admin";
import { db } from "./firebase/firebase";
import Customer from "./Components/Customer";
import AdminNav from "./Components/AdminNav";
import Bill from "./Components/Bill";
import { v4 as uuid } from 'uuid';
import AdminDetails from "./Components/AdminDetails";
import AdminMenu from "./Components/AdminMenu";
import MenuNew from "./Components/MenuNew";

function App() {
  const [users, setUsers] = useState([]);
  const [income, setIncome] = useState(0);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let userArr = [];
        snapshot.forEach((doc) => {
          userArr.push({ ...doc.data(), id: doc.id });
        });
        // console.log(userArr);
        setUsers(userArr);
      });
  }, [db]);  

  const handleDelete = async (id) => {
    await db.collection("users").doc(`${id}`).get().then(
      (doc) => {
        setIncome(income + doc.data().total);
        setOrder(order + 1);
      }
    );
    await db.collection("users").doc(`${id}`).delete();
  };

  let id = uuid();
  localStorage.setItem("o", id);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <UserLogin />
          </Route>
          <Route path="/customer-login">
            <Customer />
          </Route>
          <Route path="/foodmenu">
            <FoodMenu />
          </Route>
          <Route path={`/admin`}>
            <AdminNav />
            <div className="container">
              {/* <h2>Income: ₹{income} </h2>
              <h2>Orders: {order}</h2> */}
              {/* <h2>Orders Served: {order}</h2> */}
              {users.map((user) => (
                <Admin
                  key={user.id}
                  user={user}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </Route>
          <Route path="/details">
            <AdminDetails income={income} order={order} />
          </Route>
          <Route path="/menu">
            <AdminMenu />
          </Route>
          <Route path="/new">
            <MenuNew />
          </Route>
          <Route path="/bill">
            <Bill />
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
