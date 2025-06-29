// src/components/PaymentStatus.js
import React from 'react';

const PaymentStatus = ({ success, amount, onReset }) => {
  return (
    <div className="payment-status">
      <h2>{success ? `Payment of ₹${amount} successful!` : `Payment of ₹${amount} failed. Please try again.`}</h2>
      <button onClick={onReset}>Go Back</button>
    </div>
  );
};

export default PaymentStatus;
