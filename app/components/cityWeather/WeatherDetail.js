import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styles from "../components.module.css";
import { getDay } from "@/app/utils/getDay";

export default function WeatherDetail({ data }) {
  const day = getDay(5)
  console.log("Day", day)
  return (
    <Stack className={styles.sparklinesContainer} direction="column" sx={{ width: "100%" }}>
      <h5 className={styles.forecastTitle}>Forecast</h5>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <LineChart
          xAxis={[{ data: Array.from({ length: data.length }, (_, i) => i + 1) }]} // Sets x-axis labels to 1, 2, 3, etc.
          series={[
            {
              data: data,
              area: true,          // Fills the area under the line
              baseline: "min",     // Baseline for the area fill is set to minimum value
            },
          ]}
          width={500}              // Adjust as needed
          height={200}             // Adjust as needed
          showTooltip
        />
      </Box>
    </Stack>
  );
}