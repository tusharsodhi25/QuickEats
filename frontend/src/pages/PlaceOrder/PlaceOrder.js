
// import React, { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import { toast } from "react-toastify";



// const PlaceOrder = () => {
 

//   const [data, setData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

 

//   const handler = (e) => {
//   e.preventDefault();

//   const orderedItems = Object.entries(cartItems).map(([id, quantity]) => {
//     const itemDetails = food_list.find(item => item._id === id);
//     return {
//       name: itemDetails.name,
//       price: itemDetails.price,
//       quantity,
//       total: itemDetails.price * quantity
//     };
//   });

//   toast.success("✅ Order Placed Successfully");

//   setTimeout(() => {
//     navigate("/order-summary", {
//       state: {
//         items: orderedItems
//       }
//     });
//   }, 1000);
// };


//   const onChangehandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };




//   return (
//     <form onSubmit={handler}  className="placeorder">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             name="firstname"
//             onChange={onChangehandler}
//             required
//             value={data.firstname}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             name="lastname"
//             required
//             onChange={onChangehandler}
//             value={data.lastname}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>
//         <input
//           name="email"
//           onChange={onChangehandler}
//           required
//           value={data.email}
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           name="street"
//           onChange={onChangehandler}
//           required
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             name="city"
//             onChange={onChangehandler}
//             required
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             name="state"
//             onChange={onChangehandler}
//             required
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>

//         <div className="multi-fields">
//           <input
//             name="zipcode"
//             required
//             onChange={onChangehandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="ZipCode"
//           />
//           <input
//             name="country"
//             required
//             onChange={onChangehandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           name="phone"
//           required
//           onChange={onChangehandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
//               </b>
//             </div>
//           </div>
//           <button  type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItem, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangehandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handler = (e) => {
    e.preventDefault();

    const orderedItems = Object.entries(cartItem).map(([id, quantity]) => {
      const itemDetails = food_list.find(item => item._id === id);
      if (!itemDetails) return null;
      return {
        name: itemDetails.name,
        price: itemDetails.price,
        quantity,
        total: itemDetails.price * quantity,
      };
    }).filter(Boolean); // remove nulls

    toast.success("Order Placed Successfully");

    setTimeout(() => {
      navigate("/order-summary", {
        state: {
          items: orderedItems,
          total: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50),
          deliveryDetails: data
        }
      });
    }, 1000);
  };

  return (
    <form onSubmit={handler} className="placeorder">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstname" onChange={onChangehandler} required value={data.firstname} type="text" placeholder="First Name" />
          <input name="lastname" required onChange={onChangehandler} value={data.lastname} type="text" placeholder="Last Name" />
        </div>
        <input name="email" onChange={onChangehandler} required value={data.email} type="email" placeholder="Email Address" />
        <input name="street" onChange={onChangehandler} required value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" onChange={onChangehandler} required value={data.city} type="text" placeholder="City" />
          <input name="state" onChange={onChangehandler} required value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" required onChange={onChangehandler} value={data.zipcode} type="text" placeholder="ZipCode" />
          <input name="country" required onChange={onChangehandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name="phone" required onChange={onChangehandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
