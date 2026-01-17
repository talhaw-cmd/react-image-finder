import { useState } from "react";
import axios from "axios";
import "./ImageApp.css";

export default function ImageApp() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://pixabay.com/api/?key=50195126-128fa536484f9a35639885c20&q=${query}&image_type=photo&per_page=12`
      );
      setImages(res.data.hits);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="container">
      
      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Search</button>
      </div>

      {/* Images */}
      <div className="grid">
        {images.map((img) => (
          <div className="card" key={img.id}>
            <div className="image">
            <img src={img.largeImageURL} alt={img.user} />
            </div>
            <div className="info">
              <p className="user">{img.user}</p>
              <p className="type">{img.type}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
