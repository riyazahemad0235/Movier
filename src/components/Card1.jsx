import { useContext } from "react";
import { useState } from "react";
import { MovieContext } from "../context/MovieContext";
import styles from "./Card1.module.css";
import { Link } from "react-router-dom";

export default function Card1() {
  const [index, setIndex] = useState(0);
  const VISIBLE = 5;

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

  const data = useContext(MovieContext);
  const movies = data?.trendingMovies || [];
  const visible = movies.slice(index, index + VISIBLE);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.cards}>
          <div className={styles.titleSection}>
            <h1 className={styles.trendingTitle}>Trending Today</h1>
            <h3>
              You dont like daily same food right, same check it out and try
              which are trending today
            </h3>
          </div>

          <div className={styles.sliderwrap}>
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
                      className={styles.moviePoster}
                      alt={movie.title}
                    />
                    <div className={styles.detailSec}>
                      <h1 className={styles.movieTitle}>{movie.title}</h1>
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
      </div>
    </>
  );
}
