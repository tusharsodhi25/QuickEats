// src/components/PaymentForm.js
import React, { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      alert('Please fill in all the fields.');
      return;
    }
    onSubmit(cardNumber, expiryDate, cvv, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <label htmlFor="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        placeholder="Enter card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      />

      <label htmlFor="expiryDate">Expiry Date:</label>
      <input
        type="month"
        id="expiryDate"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />

      <label htmlFor="cvv">CVV:</label>
      <input
        type="text"
        id="cvv"
        placeholder="Enter CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        required
      />

      <label htmlFor="amount">Amount (INR):</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
