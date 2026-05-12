import React, { useEffect, useState } from "react";
import styles from "./DisplayMovie.module.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { useParams } from "react-router-dom";

function DisplayMovie() {
  const { id } = useParams();
  const URL = "https://api.themoviedb.org/3/movie/";
  const { API_KEY } = useContext(MovieContext);

  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const castURL = "https://api.themoviedb.org/3/movie/";

  useEffect(() => {
    const fetchAll = async () => {
      const [movieRes, castRes] = await Promise.all([
        fetch(`${URL}${id}?api_key=${API_KEY}`),
        fetch(`${castURL}${id}/credits?api_key=${API_KEY}`),
      ]);
      const movieData = await movieRes.json();
      const castData = await castRes.json();
      setMovie(movieData);
      setCast(castData.cast || []);
    };
    fetchAll();
  }, [id, API_KEY]);

  if (!movie || !movie.id) {
    return (
      <div className={styles.loaderBox}>
        <center>
          <div className={styles.loader}></div>
        </center>
      </div>
    );
  }

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.firstSec}>
          <div className={styles.imgSec}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt=""
              className={styles.moviePoster}
            />
          </div>
          <div className={styles.detailsSec}>
            <div className={styles.genreSec}>
              {movie.genres?.map((g) => (
                <h4 key={g.id}>{g.name}</h4>
              ))}
            </div>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.ratingSec}>
              <h1>⭐ {movie.vote_average} </h1>
              <h1>•</h1>
              <h1>{movie.release_date} </h1>
              <h1>•</h1>
              <h1>{movie.original_language} </h1>
              <h1>•</h1>
              <h1>{movie.adult ? "18+" : "13+"} </h1>
            </div>
          </div>
        </div>
        <div className={styles.secondSec}>
          <h1>Overview</h1>
          <p className={styles.overview}>{movie.overview}</p>
        </div>
        <div className={styles.thirdSec}>
          <div>
            <h1 className={styles.headings}>Rating</h1>
            <h1 className={styles.subheads}>⭐ {movie.vote_average}</h1>
          </div>
          <div>
            <h1 className={styles.headings}>Run time</h1>
            <h1 className={styles.subheads}>
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "N/A"}
            </h1>
          </div>
          <div>
            <h1 className={styles.headings}>Release</h1>
            <h1 className={styles.subheads}>
              {movie.release_date?.slice(0, 4)}
            </h1>
          </div>
          <div>
            <h1 className={styles.headings}>Language</h1>
            <h1 className={styles.subheads}>{movie.original_language}</h1>
          </div>
        </div>
        <div className={styles.castSec}>
          <h1 id={styles.castHeading}>Cast Details</h1>
          <div className={styles.track}>
            {cast.slice(0, 6).map((casts) => (
              <span className={styles.showingCast} key={casts.id}>
                <div className={styles.container}>
                  <img src={`${IMAGE_BASE_URL}${casts.profile_path}`} alt="" />
                </div>
                <h1>{casts.name}</h1>
              </span>
            ))}
          </div>
          <h2 className={styles.subHeading}>More Cast</h2>
          <div className={styles.scrollContainer}>
            <ul className={styles.castList}>
              {cast.map((remainCast) => (
                <li key={remainCast.id} className={styles.remainCast}>
                  <div className={styles.lists}>
                    <div>
                      <h4>{remainCast.name}</h4>
                      <h2>{remainCast.character}</h2>
                    </div>
                    <img
                      className={styles.remainImg}
                      src={`${IMAGE_BASE_URL}${remainCast.profile_path}`}
                      alt="⚠️"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footar}></div>
        </div>
      </div>
    </>
  );
}

export default DisplayMovie;
