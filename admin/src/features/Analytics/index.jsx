import React from "react";
import { Box, Typography } from "@mui/material";
import style from "./Analytics.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Analytics = () => {
  return (
    <Box className={style.analytics}>
      <Typography>This is analytics page</Typography>
      <Box className={style.chart}>
        <Line
          data={{
            labels: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            datasets: [
              {
                label: "Máy tính",
                data: [33, 53, 85, 41, 44, 65, 0, 0, 0, 0, 100],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                pointRadius: 10,
              },
              {
                label: "Điện thoại",
                data: [33, 25, 35, 51, 54, 76, 0, 0, 0, 0],
                fill: false,
                borderColor: "#742774",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Thống kê doanh thu đơn hàng bán được",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Analytics;
