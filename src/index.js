const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/shorten", (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl || !originalUrl.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const randomCode = Math.random().toString(36).substring(2, 8);
  const shortUrl = `http://localhost:5000/${randomCode}`;

  console.log("Shortened:", originalUrl, "=>", shortUrl);
  res.json({ shortUrl });
});

app.listen(5000, () => {
  console.log("✅ Backend is running on http://localhost:5000");
});
