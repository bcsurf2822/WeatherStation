import React, { useState } from "react";
import styles from "./card.module.css";
import WeatherDetail from "./WeatherDetail";
import { useSelector } from "react-redux";

export default function WeatherCard({ location, weather }) {
  const [selectedMetric, setSelectedMetric] = useState("temp");

  const metricData = weather.map((dayData) => dayData[selectedMetric]);

  return (
    <div className={styles.weatherCard}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{location}</h3>
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