// Header.js

import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import {  useNavigate } from 'react-router-dom';
import {  Logo, Logout, Menu, UserIcon } from '../../Constant/ImageConstant';
import { getUserSession } from '../../utils/auth';
import './Header.css'; // Importing CSS file for styling

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const[userData,setUserData]=useState()



const   getLocalData =()=>{
    const res = getUserSession();
    if (res) {
      setUserData(res?.loginUserData)
    }
    else{
      navigate('/')
    }
  }

  useEffect(() => {
    getLocalData()

  }, []);
  useEffect(()=>{},[userData])
  
  return (
    <header className="app-header">
    { false && <div className="menu-icon" onClick={toggleSidebar}>
    <img src={Logo}  alt='Menu' style={{height:'40px',width:'50px'}}/>      
      </div>}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div style={{width:'fit-content',padding:'3px 0px',borderRadius:'25px',border:'2px solid #253C80',marginTop:'10px',display:'flex'}}>
      <img src={UserIcon} alt="Logo"  style={{height:'25px',width:'25px',marginLeft:'8px'}}/>
 <p style={{color:'#253C80',margin:'5px 20px'}}>{userData?.UserName}</p>
        </div>
     
    </header>
  );
};

export default Header;