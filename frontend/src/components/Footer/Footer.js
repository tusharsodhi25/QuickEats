import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
          <div className="footer-content-left">
           <p id='logo'>𝒬uickℰats.</p>
           <p> Welcome to <strong>Quick Eats</strong> – your go-to destination for fast, fresh, and delicious meals delivered right to your doorstep. Whether you're craving local favorites or international cuisines, Quick Eats connects you with a wide variety of restaurants with just a few clicks. Enjoy hassle-free ordering, real-time tracking, and lightning-fast delivery. Because when hunger strikes, we deliver – quick and easy!</p>
           <div className="footer-social-icons">
             <img src={assets.facebook_icon} alt="" />
             <img src={assets.twitter_icon} alt="" />
             <img src={assets.linkedin_icon} alt="" />
           </div>
          </div>

          <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
               </ul>
            </div>
          <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@quickeats.com</li>
                    </ul>
          </div>
        
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ 𝒬uickℰats.com- All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
