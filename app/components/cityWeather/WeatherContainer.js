import React from "react";
import { useSelector } from "react-redux";
import styles from "../components.module.css";
import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";

export default function WeatherContainer() {
  const location = useSelector((state) => state.weather.location);
  const weatherData = useSelector((state) => state.weather.weather);
  console.log(weatherData);


  return (
    <div className="container">
      <div className="row">
        {weatherData.map((weather, index) => {
          const { temp, humidity, pressure } = weather[0]; // 
          return (
            <div className="col" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title">{location[index]}</h3>{" "}

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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
