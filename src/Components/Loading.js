import React from "react";
import "../Styling/Loading.css";

function Loading() {
  return (
    <div className="loading">
      {/* <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
      <div className="circle"></div>
    </div>
  );
}

export default Loading;
