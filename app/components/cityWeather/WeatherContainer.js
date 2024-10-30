import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../components.module.css";
import WeatherDetail from "./WeatherDetail";
export default function WeatherContainer() {
  const location = useSelector((state) => state.weather.location);
  const weatherData = useSelector((state) => state.weather.weather);

  const [selectedMetric, setSelectedMetric] = useState("temp");

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <button onClick={() => handleMetricChange("temp")}>Temperature</button>
          <button onClick={() => handleMetricChange("humidity")}>Humidity</button>
          <button onClick={() => handleMetricChange("pressure")}>Pressure</button>
        </div>

        {weatherData.map((weather, index) => {
          const metricData = weather.map((dayData) => dayData[selectedMetric]);

  
          const { temp, humidity, pressure } = weather[0];

          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title">{location[index]}</h3>
                  <div className={styles.conditionsContainer}>
                    <div className={styles.weatherData}>
                      <p className="card-text">Temperature</p>
                      <p className="card-text">{Math.round(temp)}</p>
                    </div>
                    <div className={styles.weatherData}>
                      <p className="card-text">Humidity</p>
                      <p className="card-text">{humidity}</p>
                    </div>
                    <div className={styles.weatherData}>
                      <p className="card-text">Pressure</p>
                      <p className="card-text">{pressure}</p>
                    </div>
                  </div>
                  <WeatherDetail data={metricData} metric={selectedMetric} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}