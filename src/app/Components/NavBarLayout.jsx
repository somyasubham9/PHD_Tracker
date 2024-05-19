import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx"

const LayoutWithNavbar = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== "/auth";

    return (
        <>
            {showNavbar && <Navbar />}
        </>
    );
};

export default LayoutWithNavbar;
