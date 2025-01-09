import React from "react";
import Logo from "./Images/Logo.png";
import {  FaRandom, FaSearch, FaTimes } from "react-icons/fa";
import { useMemes } from "./MemeProvider";

function Navbar({ toggleRandomize, cancelRandomize, isRandomized }) {
  const { setFilter, setCurrentPage } = useMemes();

  const handleSearch = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div id="navbar">
      <div id="nav-left">
        <a href="/"><img id="logo" src={Logo} alt="Logo" /></a>
      </div>
      <div id="nav-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div id="nav-right">
        <h3>
          Randomize
          </h3>
          <FaRandom id="faicon" onClick={toggleRandomize}/> 
         
        {isRandomized && (
          
            <FaTimes onClick={cancelRandomize} id="faicon" />
  
        )}
        
      </div>
    </div>
  );
}

export default Navbar;
