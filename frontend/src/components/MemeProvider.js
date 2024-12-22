import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const MemeContext = createContext();

export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

  useEffect(() => {
    const fetchImages = async () => {
      const folderRef = ref(storage, "Memes/");

      try {
        const result = await listAll(folderRef);
        const memeData = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const fileName = item.name.replace(/\.[^/.]+$/, "");
            const title = fileName
              .replace(/_/g, " ")
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            return {
              title: title,
              picture: url,
              publisher: "Abster",
              date: new Date().toISOString().split("T")[0],
            };
          })
        );

        setMemes(memeData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Filter memes based on the search filter
  const filteredMemes = memes.filter((meme) =>
    meme.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <MemeContext.Provider
      value={{
        memes,
        setMemes,
        filter,
        setFilter,
        filteredMemes,
        currentPage, // Expose currentPage
        setCurrentPage, // Expose setCurrentPage
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = () => useContext(MemeContext);
