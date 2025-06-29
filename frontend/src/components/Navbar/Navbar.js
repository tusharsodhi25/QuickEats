import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setshowlogin}) => {

    const[menu,setmenu] = useState("Home");
    const{getTotalCartAmount,token,settoken} = useContext(StoreContext);
    

    const navigate = useNavigate();

    const logout = ()=>{
      localStorage.removeItem("token");
      settoken("");
      navigate('/');


    }



  return (
    <div className='navbar'>


          <Link to='/'><p>𝒬uickℰats.</p></Link>
          <ul className="navbar-menu">
            <Link to='/' onClick={()=>setmenu("Home")} className={menu === "Home" ?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setmenu("Menu")}className={menu === "Menu"?"active":""}>Menu</a>
            <a href='#app-download' onClick={()=>setmenu("Mobile-App")}className={menu === "Mobile-App"?"active":""}>Mobile-App</a>
            <a href='#footer' onClick={()=>setmenu("Contact Us")}className={menu === "Contact Us"?"active":""}>Contact Us</a>
          </ul>

          <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
               <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
                <div className={getTotalCartAmount()===0? "":"dot"}></div>
            </div>
            {
              !token ? <button onClick={()=>setshowlogin(true)}>Sign In</button>
              :
              <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='navprofile-dropdown'>
                  <li>
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li>
                    <img src={assets.logout_icon} alt="" />
                    <p onClick={logout}>LogOut</p>
                  </li>
                </ul>
              </div>
            }
           
          </div>
    </div>
  )
}

export default Navbar
