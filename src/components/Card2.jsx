import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Card2.module.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function Card2() {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const data = useContext(MovieContext);
  const movies = data?.arrival || [];
  const [index, setIndex] = useState(0);
  const VISIBLE = 5;
  const visible = movies.slice(index, index + VISIBLE);

  const handleNext = () => {
    if (index + VISIBLE < movies.length) {
      setIndex((i) => i + 1);
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headingSec}>
          <h1>New Arrivals</h1>
          <h3>
            Movies never stop evolving. New stories arrive every day—check out
            the latest upcoming releases.
          </h3>
        </div>
        <div className={styles.sliderWrap}>
          <button onClick={handlePrev} className={styles.btns}>
            <span className="material-symbols-outlined">
              keyboard_double_arrow_left
            </span>
          </button>
          <div className={styles.track}>
            {visible.map((movie) => (
              <Link to={`/DisplayMovie/${movie.id}`} key={movie.id}>
                <li>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                  />
                  <div className={styles.detailsArea}>
                    <h1>{movie.title}</h1>
                    <h3>⭐ {movie.vote_average}</h3>
                  </div>
                </li>
              </Link>
            ))}
          </div>
          <button onClick={handleNext} className={styles.btns}>
            <span className="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
