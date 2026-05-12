import { createContext, useEffect, useState } from "react";
export const MovieContext = createContext();

export default function MovieProvider({ children }) {
  const [trendingMovies, setTrendingMovie] = useState([]);
  const [arrival, setArrival] = useState([]);
  const URL = "https://api.themoviedb.org/3/";
  const API_KEY = "804d3369f6d191dd806077584f3ee0ff";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const castURL = "https://api.themoviedb.org/3/movie/";
  const queryURL = "https://api.themoviedb.org/3/search/movie";
  const [pages, setPages] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const trendingRes = await fetch(
        `${URL}trending/movie/day?api_key=${API_KEY}`,
      );
      const arrivalRes = await fetch(
        `${URL}movie/now_playing?api_key=${API_KEY}`,
      );
      const trendingData = await trendingRes.json();
      const arrivalData = await arrivalRes.json();
      setTrendingMovie(trendingData.results);
      setArrival(arrivalData.results);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovie([]);
      return;
    }
    const timer = setTimeout(async () => {
      const queryRes = await fetch(
        `${queryURL}?api_key=${API_KEY}&query=${searchQuery}`,
      );
      const queryData = await queryRes.json();
      setMovie(queryData.results || []);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        arrival,
        IMAGE_BASE_URL,
        API_KEY,
        searchQuery,
        setSearchQuery,
        movie,
        setMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
