// src/components/PaymentPage.js
import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import PaymentStatus from './PaymentStatus';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = (cardNumber, expiryDate, cvv, amount) => {
    console.log('Processing payment...');
    
    // Simulate payment processing (delay)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // 50% chance of success
      setPaymentStatus({ success: isSuccess, amount });
    }, 2000);
  };

  const handleReset = () => {
    setPaymentStatus(null);
  };

  return (
    <div className="payment-container">
      <h1>Payment Gateway</h1>
      {!paymentStatus ? (
        <PaymentForm onSubmit={handlePayment} />
      ) : (
        <PaymentStatus success={paymentStatus.success} amount={paymentStatus.amount} onReset={handleReset} />
      )}
    </div>
  );
};

export default PaymentPage;
