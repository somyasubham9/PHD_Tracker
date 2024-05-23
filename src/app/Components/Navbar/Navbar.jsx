import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { FaBarsStaggered } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

import "./Navbar.css";
import { IconContext } from "react-icons";
import { AdminSidebarData } from "./AdminSideBarData";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateOnLogout } from "../../Redux/slices/userSlice";
import { toast } from "react-toastify";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const toggleDropdown = () => setDropdown(!dropdown);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = useSelector((state) => state.user);

  const handleLogout = () => {
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("userDetails");
    dispatch(updateIsLoggedIn(false));
    dispatch(updateOnLogout());
    toast.success("Logout Successfull");
  };

  //   useEffect(() => {
  //   if (!initialState.isLoggedIn) {
  //     console.log('Navigating to /auth...');
  //     navigate('/auth');
  //   }
  // }, [initialState.isLoggedIn, navigate]);

  useEffect(() => {
    setIsAdmin(initialState.isAdmin);
  }, []);

  let menuRef = useRef();

  const handleDelete = () => {
    console.log("Delete clicked");
    // Add delete functionality here
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBarsStaggered onClick={showSidebar} color="black" />
            <div onClick={toggleDropdown}>
              <PiDotsThreeBold color="black" />
              {dropdown && (
                <div className="dropdown-menu" ref={menuRef}>
                  <ul>
                    <li onClick={handleDelete}>
                      <CgProfile color="black" />
                      <span>Profile</span>
                    </li>
                    <li onClick={handleLogout}>
                      <IoIosLogOut color="black" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </Link>
        </div>
        <nav
          className={sidebar ? "nav-menu active custom-scrollbar" : "nav-menu"}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose color="black" />
              </Link>
            </li>
            {!isAdmin &&
              SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            {isAdmin &&
              AdminSidebarData.map((item, index) => {
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
