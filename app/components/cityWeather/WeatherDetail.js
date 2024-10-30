import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";


export default function WeatherDetail({ data }) {
  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <h5>Forecast</h5>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <SparkLineChart data={data} height={100} showTooltip showHighlight />
      </Box>
    </Stack>
  );
}
