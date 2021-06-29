import React, { useEffect, useState } from "react";
import request from "./request";
import "./Banner.css";

function Banner() {
  const baseURL = "https://api.themoviedb.org/3";
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseURL}${request.fetchNetflixOriginals}`)
        .then((response) => response.json())
        .then((json) =>
          setMovie(
            json.results[Math.floor(Math.random() * json.results.length - 1)]
          )
        );
      return res;
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__faded"></div>
    </header>
  );
}

export default Banner;
