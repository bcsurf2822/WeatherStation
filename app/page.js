"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getWeather } from "./services/openWeatherAPI";

export default function Home() {

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getWeather("Marmora");
        setLocation(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
Search
      </div>
        
  
    </div>
  );
}
