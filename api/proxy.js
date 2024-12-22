const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const handler = async (req, res) => {
  // Set CORS headers explicitly for the response
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { url } = req.query;

  
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    
    const fetch = (await import("node-fetch")).default;

    
    const response = await fetch(url);

   
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the resource" });
    }

 
    const contentType = response.headers.get("Content-Type");

    
    const buffer = await response.buffer();
    res.setHeader("Content-Type", contentType);
    res.send(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "An error occurred while fetching the resource" });
  }
};

app.get("/proxy", handler);

// Use Render's PORT environment variable or default to port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
