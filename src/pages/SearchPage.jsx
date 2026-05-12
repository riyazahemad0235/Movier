import React from "react";
import styles from "./SearchPage.module.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const { searchQuery } = useContext(MovieContext);
  const { movie } = useContext(MovieContext);
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {/* Header - matches screenshot: left red border, small label, big query, small label */}
      <div className={styles.firstSec}>
        <h4>SEARCH RESULTS FOR</h4>
        <h1>{searchQuery || "search"}.</h1>
        <h4>&amp; TITLES FOUND</h4>
      </div>

      {/* Movie grid */}
      <div className={styles.movieGrid}>
        {Array.isArray(movie) &&
          movie.map((movies) => (
            <div className={styles.movieSec} key={movies.id}>
              <Link to={`/DisplayMovie/${movies.id}`}>
                <img
                  src={`${IMG_BASE_URL}${movies.poster_path}`}
                  className={styles.movieImg}
                  alt={movies.title}
                />
                <h2>{movies.title}</h2>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
