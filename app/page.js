"use client";
import styles from "./page.module.css";
import { Quicksand } from "next/font/google";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/cityWeather/WeatherCard";
import { useSelector } from "react-redux";
import classNames from "classnames";
import SideNav from "./components/SideNav";

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const city = useSelector((state) => state.weather.city);
  const state = useSelector((state) => state.weather.state);
  const weatherData = useSelector((state) => state.weather.weather);

  return (
    <div className={classNames(styles.page, quicksand.className)}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.sideNav}>
        <SideNav />
      </div>
      <div className={styles.mainContent}>
        {weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            location={location[index]}
            weather={weather}
            city={city[index]}
            state={state[index]}
          />
        ))}
      </div>
    </div>
  );
}
