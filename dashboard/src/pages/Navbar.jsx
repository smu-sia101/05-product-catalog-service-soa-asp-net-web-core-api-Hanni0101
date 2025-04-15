import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import InventoryIcon from '@mui/icons-material/Inventory';

function Navbar() {
    return (
        <div className="Navbar-content">
            <div className="logo-section">
                <InventoryIcon className="icon" />
                <h2>PRODUCT CATALOG</h2>
            </div>

            <div className="menu-section">
                <Link to="/" className="link">
                    <p><b>HOME</b></p>
                </Link>
                <Link to="/AddProduct" className="link">
                    <p><b>ADD PRODUCT</b></p>
                </Link>
                <Link to="/ProductList" className="link">
                    <p><b>PRODUCT LIST</b></p>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
