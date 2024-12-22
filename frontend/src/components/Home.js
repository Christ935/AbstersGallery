import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Body from "./Body";

function Home() {
  const [isRandomized, setIsRandomized] = useState(false);
  const [randomizeTrigger, setRandomizeTrigger] = useState(0);

  const toggleRandomize = () => {
    setIsRandomized(true); 
    setRandomizeTrigger((prev) => prev + 1); 
  };

  const cancelRandomize = () => {
    setIsRandomized(false); 
  };

  const onExplore = () => {
    document.getElementById("body").scrollIntoView({ behavior: "smooth" });
  };
  const onAbout =() =>{
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div id="container">
      <Navbar toggleRandomize={toggleRandomize} cancelRandomize={cancelRandomize} isRandomized={isRandomized} />
      <Header onAbout={onAbout} onExplore={onExplore} />
      <Body isRandomized={isRandomized} triggerRandomize={randomizeTrigger} />
    </div>
  );
}

export default Home;
