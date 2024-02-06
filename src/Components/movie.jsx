import React, { useState } from "react";
export default function Movie() {
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "89640e6b0020f2b0e5bbb57a6cdd55ae"; // Your TMDb API key
  const API_URL = `https://api.themoviedb.org/3/movie/`;

  const handleInputChange = (event) => {
    setMovieId(event.target.value);
  };

  const fetchData = () => {
    if (!movieId) {
      setError("Please enter a movie ID");
      return;
    }

    console.log("Fetching movie data for", API_URL + movieId);
    fetch(API_URL + movieId + `?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status_message) {
          setError(data.status_message);
          setMovieData(null);
        } else {
          setError(null);
          setMovieData(data);
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
          value={movieId}
          onChange={handleInputChange}
          placeholder="Enter movie ID"
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
