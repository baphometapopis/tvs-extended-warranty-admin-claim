// AppLayout.js

import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

import './AppLayout.css'; // Importing CSS file for styling
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile?false: true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="app-layout">

      <Header toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={true} />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;