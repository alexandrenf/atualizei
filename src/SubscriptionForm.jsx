// src/SubscriptionForm.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./SubscriptionForm.css";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
      });
      setMessage("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Subscribe to our Newsletter</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SubscriptionForm;
