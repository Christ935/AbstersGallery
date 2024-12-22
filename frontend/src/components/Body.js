import React, { useState, useEffect } from "react";
import Boxes from "./Boxes";
import { useMemes } from "./MemeProvider";
import Footer from "./Footer";
import { FaDownload } from "react-icons/fa";

function Body({ isRandomized, triggerRandomize }) {
  const { filteredMemes, setCurrentPage, currentPage } = useMemes();
  const [popupImage, setPopupImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffledMemes, setShuffledMemes] = useState([]);
  const itemsPerPage = 12;

  const randomizeMemes = () => {
    const shuffled = [...filteredMemes].sort(() => Math.random() - 0.5).slice(0,12);
    setShuffledMemes(shuffled);
  };

  useEffect(() => {
   
    if (isRandomized) {
      setCurrentPage(1);
      randomizeMemes();
    } else {
      setShuffledMemes(filteredMemes);
    }
  }, [isRandomized, filteredMemes, setCurrentPage]);

  useEffect(() => {
    if (isRandomized) {
      randomizeMemes();
    }
  }, [triggerRandomize]);

  const openPopup = (image) => {
    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };
  const downloadImage = async (url, filename) => {
    try {
      const proxyUrl = `https://absters-gallery-be.vercel.app/proxy?url==${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }
      const blob = await response.blob();
  
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const totalPages = Math.ceil(shuffledMemes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = shuffledMemes.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    setTimeout(() => {
      document.getElementById("body").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      
    }
    setTimeout(() => {
      document.getElementById("body").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    };
  

  useEffect(() => {
    setLoading(true);
    const imageLoadPromises = currentItems.map(
      (meme) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = meme.picture;
          img.onload = resolve;
          img.onerror = resolve;
        })
    );

    Promise.all(imageLoadPromises).then(() => setLoading(false));
  }, [currentItems]);

  return (
    <div id="body">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div id="body-top">
            <h2>Dive into the Memeverse</h2>
            <h5>Explore Now</h5>
          </div>

          <div id="body-boxes">
            {currentItems.map((meme, index) => (
              <Boxes key={index} meme={meme} openPopup={openPopup} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              &larr; Prev
            </button>
            <span className="page-number">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>

          {popupImage && (
            <div className="popup-overlay" onClick={closePopup}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h3>{popupImage.title}</h3>
                <img src={popupImage.picture} alt={popupImage.title} />
                <div id="popup-btns">
                  <button className="header-left-btn2" onClick={closePopup}>
                    Close
                  </button>
                 
                    <button  onClick={() =>
                      downloadImage(popupImage.picture, `${popupImage.title}.jpg`)
                    } className="header-left-btn">
                      Download <FaDownload id="arrowfa" />
                    </button>
                  
                </div>
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}

export default Body;
