// server.js
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// To handle ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static frontend files

// QR Code generation endpoint
app.post("/generate", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qr_svg = qr.image(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    qr_svg.pipe(res); // Stream the image directly to the response
  } catch (error) {
    console.error("QR Generation error:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
