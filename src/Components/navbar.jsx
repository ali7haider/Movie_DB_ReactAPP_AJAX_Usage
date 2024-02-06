import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="navtitle">
        <Link to="/">
          <img src="/logo-main.png" alt="Logo" />
          <h1>Movies DB - AJAX Usage</h1>
        </Link>
      </div>
    </nav>
  );
}
