const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for both local and serverless
const handler = async (req, res) => {
  // Set explicit CORS headers for serverless deployment
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { url } = req.query;

  // Validate the URL parameter
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Import fetch dynamically for compatibility
    const fetch = (await import("node-fetch")).default;

    // Fetch the requested resource
    const response = await fetch(url);

    // Check if the fetch request was successful
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the resource" });
    }

    // Send the response data
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.send(Buffer.from(buffer));
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

  // Define the route for local testing
  app.get("/proxy", handler);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });
}
