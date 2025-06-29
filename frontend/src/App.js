
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import { ToastContainer } from 'react-toastify';
import Ordersummary from './pages/PlaceOrder/Ordersummary';

function App() {
  const[showlogin,setshowlogin] = useState(false);
  return (
    <>
    {showlogin?<LoginPopUp setshowlogin={setshowlogin}/> : <></>}
<div className="App">
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
        <Route path="/order-summary" element={<Ordersummary />} />


      </Routes>
      <ToastContainer/>
    </div>

    <Footer/>
    
    
    
    </>
    

  );
}

export default App;
