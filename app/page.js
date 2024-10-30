"use client";

import styles from "./page.module.css";

import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/cityWeather/WeatherContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.sideNav}></div>
      <div className="weatherContainer">
        <div className="container text-center">
        <div className="row">
          <WeatherContainer /> 
        </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}
