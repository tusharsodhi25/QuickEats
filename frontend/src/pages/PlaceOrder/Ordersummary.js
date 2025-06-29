import React from 'react';
import { useLocation } from 'react-router-dom';
import './Ordersummary.css'

const Ordersummary = () => {
  const { state } = useLocation();
  const { items, total, deliveryDetails } = state || {};

  return (
    <div className='div' style={{ padding: '20px' }}>
      <h2>🧾 Order Summary</h2>

      <h3>Items Ordered:</h3>
      <ul>
        {items?.map((item, i) => (
          <li className='list' key={i}>
            {item.name} × {item.quantity} = ₹{item.total}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Total: ₹{total}</h3>

      <hr />

      <h3>Delivery Info:</h3>
      <p>{deliveryDetails?.firstname} {deliveryDetails?.lastname}</p>
      <p>{deliveryDetails?.street}, {deliveryDetails?.city}, {deliveryDetails?.state}</p>
      <p>{deliveryDetails?.zipcode}, {deliveryDetails?.country}</p>
      <p>📞 {deliveryDetails?.phone}</p>
      <p>📧 {deliveryDetails?.email}</p>
    </div>
  );
};

export default Ordersummary;
