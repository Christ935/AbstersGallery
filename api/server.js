const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Proxy endpoint for both local and serverless
const handler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const fetch = (await import("node-fetch")).default; // Dynamic import
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the resource" });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.send(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "An error occurred while fetching the resource" });
  }
};

// Export handler for Vercel
module.exports = handler;

// Only run the Express server locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.get("/proxy", handler);
  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });
}
