import React from "react";

function Boxes({meme, openPopup}) {
    const {title, picture, publisher, date} = meme;
    return (
        <div id="boxes">
           <h4>{title}</h4>
           <img id="box-pic" src={picture} alt={title} onClick={()=>openPopup(meme)} />
              <p>Published by: <span id="publisher"> {publisher}</span></p>
                <p>{date}</p>
        </div>
    )
}
export default Boxes;