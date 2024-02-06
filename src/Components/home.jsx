import React from "react";
import Navbar from "./navbar";
import Movie from "./movie";

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <div className="container">
        <Movie />
      </div>
    </div>
  );
}
