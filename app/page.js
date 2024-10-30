"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getWeather } from "./services/openWeatherAPI";
import SearchBar from "./components/SearchBar";

export default function Home() {

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
        
  
    </div>
  );
}
