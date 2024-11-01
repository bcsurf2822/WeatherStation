import React, { useState } from "react";
import styles from "./card.module.css";
import WeatherDetail from "./WeatherDetail";

export default function WeatherCard({ city, state, weather}) {
  const [selectedMetric, setSelectedMetric] = useState("temp");

  const metricData = weather.map((dayData) => dayData[selectedMetric]);


  return (
    <div className={styles.weatherCard}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{city}</h3>
          {/* <p className={styles.cardState}>{state}</p> */}
          <WeatherDetail
            data={metricData}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
        </div>
      </div>
    </div>
  );
}