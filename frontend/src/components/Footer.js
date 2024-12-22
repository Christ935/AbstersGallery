import React from "react";
import {FaTwitter, FaDiscord, FaInstagram, FaTelegram} from "react-icons/fa";

function Footer() {
    return (
        <div id="footer-container">
        <div id="footer">
            <div id="footer-left">
                <h5>Follow Our Socials</h5>
                <p>Stay connected with Abstract Blockchain and Abster Pudgy Penguin for the latest updates, innovations, and community vibes. Follow our socials and join the journey as we redefine creativity and blockchain together!</p>
                <div id="footer-socials">
                    <a className="footer-socials-icons" href="https://x.com/AbstractChain" target="_blank" rel="noreferrer">
                        <FaTwitter />
                    </a>
                    <a className="footer-socials-icons" href="https://discord.com/invite/abstractchain" target="_blank" rel="noreferrer">
                        <FaDiscord />
                    </a>
                
                    <a className="footer-socials-icons" href="https://t.me/abstract_chain" target="_blank" rel="noreferrer">
                        <FaTelegram />
                    </a>
                    </div>  
                       
            </div>
            <div id="footer-right">

            <div id="footer-right-top">
                <h5>More About Abstract</h5>
            </div>

            <div id="footer-right-bottom">

            <div className="footer-links">
            <a href="https://docs.abs.xyz/">Docs</a>
            </div>

            <div className="footer-links">
            <a href="https://www.abs.xyz/">Join Waitlist</a>
            </div>

        
<div className="footer-links">
    <a href="https://lu.ma/abstractchain">Events Calendar</a>
</div>   
            
          

           
            <div className="footer-links">
            <a href="https://create-abstract-app.vercel.app/">AGW</a>
            </div>

            </div>
            </div>

        

    
        </div>
        <div id="footer-bottom">
            <p>Abster's Gallery Created By <a id="creator" href="https://x.com/y33zusm0d3">Twitter</a>.</p>
        </div>
        </div>
    )
}
export default Footer;