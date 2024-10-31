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
      <Box className={styles.chart} sx={{ flexGrow: 1, marginTop: .5 }}>
        <LineChart
          xAxis={[{ data: data.map((_, index) => index),
            valueFormatter: (index) => day[index], 
            tickInterval: 1, 
                 scaleType: "point"
   
          }]} 
          series={[
            {
              data: data,
              area: true,       
              baseline: "min",     
            },
          ]}
          width={500}              
          height={200}          
          showTooltip
        />
      </Box>
    </Stack>
  );
}