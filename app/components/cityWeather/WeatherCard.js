import React, { useState } from "react";
import styles from "../components.module.css";
import WeatherDetail from "./WeatherDetail";

export default function WeatherCard({ location, weather }) {
  const [selectedMetric, setSelectedMetric] = useState("temp");


  const metricData = weather.map((dayData) => dayData[selectedMetric]);
  const { temp, humidity, pressure } = weather[0]; 
  return (
    <div className={styles.weatherCard}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{location}</h3>
          <div className={styles.conditionsContainer}>
            <div className={styles.weatherData}>
              <p className={styles.metric}>Temperature</p>
              <p>{Math.round(temp)}</p>
            </div>
            <div className={styles.weatherData}>
              <p className={styles.metric}>Humidity</p>
              <p>{humidity}</p>
            </div>
            <div className={styles.weatherData}>
              <p className={styles.metric}>Pressure</p>
              <p>{pressure}</p>
            </div>
          </div>
    
          <WeatherDetail data={metricData} metric={selectedMetric} />
        </div>
      </div>
    </div>
  );
}