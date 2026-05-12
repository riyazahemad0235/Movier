import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      navigate("/SearchPage");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.navSec}>
        <div className={styles.firstSec}>
          <Link className={styles.link} to="/">
            <h2 className={styles.homeLink}>Movier</h2>
          </Link>
          <span className="material-symbols-outlined">movie_info</span>
        </div>

        <div className={styles.thirdSec}>
          <div className={styles.searchSec}>
            <div className={styles.borderBox}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchBar}
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <span className="material-symbols-outlined">video_search</span>
          </div>
          <div className={styles.profile}>
            <h1 className={styles.profile}>Profile</h1>
          </div>
        </div>
      </div>
    </>
  );
}
