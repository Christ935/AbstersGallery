import React from "react";
import { FaArrowRight, FaUser } from "react-icons/fa";
import penguheader from "./Images/pengurocket.jpg";
function Header({onExplore, onAbout}) {
    return (
        <div id="header">
            <div id="header-left">
            <h1>Discover, Collect, and Share Your Favorite Abster Memes !</h1>
            <p>Explore a world of Abster memes that blend art and humor in unique ways. Discover, collect, and share digital masterpieces with a community that loves creativity!</p>
            <div id="header-left-btns">
                <button className="header-left-btn" onClick={onExplore}>Explore <FaArrowRight id="arrowfa"/></button>
                <button onClick={onAbout} className="header-left-btn2">About Us <FaUser id="arrowfa"/></button>

            </div>
        </div>
        <div id="header-right">
            <img src={penguheader} alt="penguheader" id="penguheader"/>
        </div>
        </div>
    );
}
export default Header;