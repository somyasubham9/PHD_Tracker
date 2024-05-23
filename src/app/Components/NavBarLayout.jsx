import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx";

const LayoutWithNavbar = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/auth" && location.pathname !== "/erepo";

  return <>{showNavbar && <Navbar />}</>;
};

export default LayoutWithNavbar;
