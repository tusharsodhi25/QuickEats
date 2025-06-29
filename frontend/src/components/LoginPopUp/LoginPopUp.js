import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets';
import {StoreContext} from '../../Context/StoreContext';
import axios from 'axios'

const LoginPopUp = ({setshowlogin}) => {
    const[currentState,setCurrentState]= useState("Login");

    const{url,settoken} = useContext(StoreContext);

    const[data,setdata] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangehandler = (event)=>{

      const name = event.target.name;
      const value = event.target.value;
      setdata(data=>({...data,[name]:value}))

    }


    const onLogin = async (event)=>{

      event.preventDefault();
      let newUrl = url;
         

      if(currentState==="Login"){
        newUrl+= "/api/user/login"
      }else{
        newUrl+= "/api/user/register"
      }


      const response = await axios.post(newUrl,data);

      if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem("token",response.data.token);
        setshowlogin(false)

      }else{
        alert(response.data.message);
      }

    }

  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='loginpopup-container'>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currentState==="Login"?<></>: <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Your Email' required />
            <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='Your Password' required />
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState==='Login'?
         <p>Create A New Account? <span onClick={()=>setCurrentState('Sign Up')}>Click Here</span></p>
         :
         <p>Already Have an Account? <span onClick={()=>setCurrentState('Login')}>Login Here</span></p>
        }
    
      </form>

    </div>
  )
}

export default LoginPopUp
