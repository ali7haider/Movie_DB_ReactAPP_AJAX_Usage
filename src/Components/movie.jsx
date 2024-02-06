import React, { useState } from "react";

export default function Movie() {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "89640e6b0020f2b0e5bbb57a6cdd55ae"; // Your TMDb API key
  const API_URL = `https://api.themoviedb.org/3/search/movie`;

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  const fetchData = () => {
    if (!movieName) {
      setError("Please enter a movie name");
      return;
    }

    console.log("Fetching movie data for", API_URL + `?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`);
    fetch(API_URL + `?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          setError("No movie found with that name");
          setMovieData(null);
        } else {
          setError(null);
          // For simplicity, just take the first result
          setMovieData(data.results[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setMovieData(null);
      });
  };

  return (
    <div className="movie-app">
      <h1>Movie Details</h1>
      <div className="input-container">
        <input
          type="text"
          value={movieName}
          onChange={handleInputChange}
          placeholder="Enter movie name"
        />
        <button onClick={fetchData}>Get</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {movieData && (
        <div className="movie-info">
          <h2>{movieData.title}</h2>
          <p>Release Date: {movieData.release_date}</p>
          <p>Overview: {movieData.overview}</p>
          <p>Rating: {movieData.vote_average}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
            alt="Movie Poster"
          />
        </div>
      )}
    </div>
  );
}
