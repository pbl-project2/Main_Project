import React from "react";
import Footer from "./Footer";
import { db } from "../firebase/firebase";

import "../Styling/ContactUs.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function ContactUs() {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    email: "",
    feedback: "",
  });

  const handleEmailChange = (e) => {
    setUserInput({ ...userInput, email: e.target.value });
  };

  const handleFeedbackChange = (e) => {
    setUserInput({ ...userInput, feedback: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("feedback").doc(`${userInput.email}`).set({
      email: userInput.email,
      feedback: userInput.feedback,
    });
    // reset form after submission
    setUserInput({
      email: "",
      feedback: "",
    });
    toast.success("Feedback submitted successfully"); 
  };

  return (
    <>
      <nav>
        <h3>
          Up<span>Menu</span>
        </h3>
        <button className="login-btn" onClick={() => history.push("/bill")}>
          Back
        </button>
      </nav>

      <div className="box">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            onChange={handleEmailChange}
            value={userInput.email}
            placeholder="Enter your email"
            required
          />
          <br />
          <textarea
            className="form-textarea"
            name="feedback"
            onChange={handleFeedbackChange}
            value={userInput.feedback}
            placeholder="Your Feedback here..."
            rows="10"
            required
          ></textarea>
          <br />
          <input
            className="form-submit"
            type="submit"
            value="Submit"
            required
          />
          <br />
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ContactUs;
