
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';

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

      </Routes>
    </div>

    <Footer/>
    
    
    
    </>
    

  );
}

export default App;
