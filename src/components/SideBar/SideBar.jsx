import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api_Endpoints } from '../../Api/apiEndpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import {
  DashboardIcon,
  ClaimList,
  SoldPolicyList,
  Invoices,
  Report,
  Logout,
  Logo,
  Menu
} from '../../Constant/ImageConstant';
import { getUserSession } from '../../utils/auth';
import './SideBar.css';

const iconMap = {
  DashboardIcon,
  ClaimList,
  SoldPolicyList,
  Invoices,
  Report,
  Logout,
  Logo,
  Menu
};

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
 const  sidebarlist={
  "parentId": 25,
  "parentUrl": "claimDashboard",
  "parentMenuName": "claimDashboard",
  "parentMenuIcon": "fa fa-fw fa-dashboard",
  "parentMenuIsActive": true,
  "parentMenuAccess": "1",
  "View":1,
  "Edit":1,
  "children": [
    {
      "childId": 1,
      "childUrl": "/",
      "childMenuName": "Dashboard",
      "childMenuIcon": "DashboardIcon",
      "childMenuIsActive": true,
      "childMenuAccess": "1"
  },
  {
    "childId": 2,
    "childUrl": "/sold-policy",
    "childMenuName": "Sold Policy List",
    "childMenuIcon": "SoldPolicyList",
    "childMenuIsActive": true,
    "childMenuAccess": "1"
},{
  "childId": 3,
  "childUrl": "/claims",
  "childMenuName": "Claim List",
  "childMenuIcon": "ClaimList",
  "childMenuIsActive": true,
  "childMenuAccess": "1"
},  {
  "childId": 4,
  "childUrl": "/reports",
  "childMenuName": "Reports",
  "childMenuIcon": "Report",
  "childMenuIsActive": true,
  "childMenuAccess": "1"
}, {
  "childId": 5,
  "childUrl": "/Invoices",
  "childMenuName": "Invoices",
  "childMenuIcon": "Invoices",
  "childMenuIsActive": true,
  "childMenuAccess": "1"
},

  ]




}


const fetchdata=async()=>{
  const response = await makeApiCall(Api_Endpoints.getUserPrivilage, 'POST',);
  if (response?.status==200) {
    const sidebarmenu=response?.data?.filter(item => item.parentId === 0)
    setMenuItems(sidebarmenu[0]?.children)
  
  }

}
  useEffect(() => {
    fetchdata()

  }, []);
  
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
    window.location.reload();


  }


  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        {console.log(menuItems)}
        {menuItems?.map((item, index) => (
          
          <li key={index} className="menu-item" onClick={() => navigate(item.childUrl)}>
            <img src={iconMap[item.childMenuIcon]} alt={item.childMenuName} className="menu-icon" />
            {item.childMenuName}
          </li>
        ))}
      </ul>
   
  <div onClick={handleLogout} style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer',position:'absolute',bottom:0,left:'50px'}}>
  <p style={{color:'red'}}>Logout</p>
  <img src={Logout}  alt='Menu' style={{height:'40px',width:'40px'}}/>
  </div>
    </div>
  );
};

export default Sidebar;

