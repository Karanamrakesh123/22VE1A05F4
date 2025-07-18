import React, { useState } from "react";
import axios from "axios";

function App() {
  const [OriginalUrl, SetOriginalUrl] = useState("");
  const [ShortUrl, SetShortUrl] = useState("");
  const [Error, SetError] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    SetError("");
    SetShortUrl("");

    try {
      const Response = await axios.post("http://localhost:5000/api/shorten", {
        originalUrl: OriginalUrl,
      });
      console.log("Backend response:", Response.data);
      SetShortUrl(Response.data.shortUrl);
    } catch (err) {
      SetError("Failed to shorten the URL.");
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={HandleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={OriginalUrl}
          onChange={(e) => SetOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {ShortUrl && (
        <p>
          Short URL:{" "}
          <a href={ShortUrl} target="_blank" rel="noopener noreferrer">
            {ShortUrl}
          </a>
        </p>
      )}

      {Error && <p style={{ color: "red" }}>{Error}</p>}
    </div>
  );
}

export default App;
