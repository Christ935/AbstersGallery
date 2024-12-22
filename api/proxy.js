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

  // Validate the URL
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Dynamically import node-fetch for compatibility
    const fetch = (await import("node-fetch")).default;

    // Fetch the resource from Firebase
    const response = await fetch(url);

    // Check for a successful response
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the resource" });
    }

    // Get the content type of the resource
    const contentType = response.headers.get("Content-Type");

    // Convert the response body to a buffer and send it back
    const buffer = await response.buffer();
    res.setHeader("Content-Type", contentType);
    res.send(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "An error occurred while fetching the resource" });
  }
};

module.exports = handler;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.get("/proxy", handler);
  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });
}
