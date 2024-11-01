import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styles from "./details.module.css";
import { getDay } from "@/app/utils/getDay";

export default function WeatherDetail({
  data,
  selectedMetric,
  setSelectedMetric,
}) {
  const day = getDay(5);
  console.log("Day", day);
  return (
    <Stack
      className={styles.sparklinesContainer}
      direction="column"
      sx={{ width: "97%" }}
    >
      <div className={styles.switchContainer}>
        <button
          className={selectedMetric === "temp" ? styles.activeButton : ""}
          onClick={() => setSelectedMetric("temp")}
        >
          Temperature
        </button>
        <button
          className={selectedMetric === "humidity" ? styles.activeButton : ""}
          onClick={() => setSelectedMetric("humidity")}
        >
          Humidity
        </button>
        <button
          className={selectedMetric === "pressure" ? styles.activeButton : ""}
          onClick={() => setSelectedMetric("pressure")}
        >
          Pressure
        </button>
      </div>
      <Box className={styles.chart} sx={{ flexGrow: 1, marginTop: 0.5 }}>
        <LineChart
          sx={{ width: "97%", height: "100%" }}
          xAxis={[
            {
              data: data.map((_, index) => index),
              valueFormatter: (index) => day[index],
              tickInterval: 1,
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: data,
              area: true,
              baseline: "min",
              color: "#235789",
            },
          ]}
          showtooltip="true"
        />
      </Box>
    </Stack>
  );
}
