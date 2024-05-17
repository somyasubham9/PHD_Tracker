import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { FaBarsStaggered } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const toggleDropdown = () => setDropdown(!dropdown);

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add logout functionality here
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    // Add delete functionality here
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBarsStaggered onClick={showSidebar} color="black" />
          <div onClick={toggleDropdown}>
            <PiDotsThreeBold color='black' />
            {dropdown && (
              <div className='dropdown-menu'>
                <ul>
                  <li onClick={handleDelete}>
                  <CgProfile color='black'/>
                  <span>Profile</span>
                  </li>
                  <li onClick={handleLogout}>
                  <IoIosLogOut color='black'/>
                  <span>Logout</span></li>
                </ul>
              </div>
            )}
          </div>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active custom-scrollbar' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose color='black' />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
