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

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let userArr = [];
        snapshot.forEach((doc) => {
          userArr.push({ ...doc.data(), id: doc.id });
        });
        // console.log(userArr);
        setUsers(userArr);
      });
    // const q = query(collection(db, 'users'), orderBy("timestamp", "desc"));
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   let userArr =[];
    //   snapshot.forEach((doc) => {
    //     userArr.push({ ...doc.data(), id: doc.id });
    //   });
    //   setUsers(userArr);
    // });
    // return () => unsubscribe;

    // const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
    //   let userArr = [];
    //   snapshot.forEach((doc) => {
    //     userArr.push({ ...doc.data(), id: doc.id });
    //   });
    // });
    // return () => unsubscribe;
  }, [db]);

  const handleDelete = async (id) => {
    await db.collection("users").doc(`${id}`).delete();
    // await deleteDoc(doc(db, "users", id));
  };
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
          <Route path="/admin">
            <AdminNav />
            <div className="container">
              {users.map((user) => (
                <Admin key={user.id} user={user} handleDelete={handleDelete} />
              ))}
            </div>
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
