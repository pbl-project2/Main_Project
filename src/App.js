import "./App.css";
import React from "react";
import UserLogin from "./Components/UserLogin.jsx";
import { Routes, Route } from "react-router-dom";
import FoodMenu from "./Components/FoodMenu";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/FoodMenu" element={<FoodMenu />} />
        <Route exact path="/" element={<UserLogin />} />
        
      </Routes>
    </div>
  );
}

export default App;
