import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import InventoryIcon from '@mui/icons-material/Inventory';


function Navbar(){
    return(
        <div className="Navbar-content">
            <div className="menu-item">
            <InventoryIcon className="icon" />
            <h2>PRODUCT CATALOG</h2>
            </div>

            <div className="menu-item">
                <Link to="/" className="link">
                <p><b>Home</b></p>
            </Link>
            </div>

            <div className="menu-item">
                <Link to="/AddProduct" className="link">
                <p><b>ADD PRODUCT</b></p>
            </Link>
            </div>

            <div className="menu-item">
                <Link to="/ProductList" className="link">
                <p><b>PRODUCT LIST</b></p>
            </Link>
            </div>
        </div>
   
    );
}

export default Navbar;