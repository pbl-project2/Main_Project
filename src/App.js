import "./App.css";
import React from "react";
import UserLogin from "./Components/UserLogin.jsx";
import { Routes, Route } from "react-router-dom";
import FoodMenu from "./Components/FoodMenu";
import Admin from "./Components/Admin";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/FoodMenu" element={<FoodMenu />} />
        <Route exact path="/" element={<UserLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
