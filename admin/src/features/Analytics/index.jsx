import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import style from "./Analytics.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";
import {
  fetchChartCategoryAsync,
  fetchChartYearAsync,
} from "../../app/chartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Analytics = () => {
  const dispatch = useDispatch();
  const chartLine = useSelector((state) => state.chart.currentLine);
  const chartPie = useSelector((state) => state.chart.currentPie);

  useEffect(() => {
    const fetchChart = async () => {
      const action = await fetchChartYearAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    const fetchChartPie = async () => {
      const action = await fetchChartCategoryAsync();
      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
    };

    fetchChart();
    fetchChartPie();
  }, [dispatch]);

  const covertToDataset = (chart) => {
    return chart.map((item) => {
      let ran1 = Math.floor(Math.random() * 255);
      let ran2 = Math.floor(Math.random() * 255);
      let ran3 = Math.floor(Math.random() * 255);
      const label = item._id.year.toString() || "";
      return {
        label: label,
        data: item.monthlyusage.map((item) => item.quantity),
        backgroundColor: `rgba(${ran1},${ran2},${ran3},0.2)`,
        borderColor: `rgba(${ran1},${ran2},${ran3},1)`,
        pointRadius: 5,
      };
    });
  };

  const covertToDatasetPie = (chart) => {
    return {
      labels: chart.map((item) => item.name),
      datasets: [
        {
          label: "# of Votes",
          data: chart.map((item) => item.quantity),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

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
            datasets: covertToDataset(chartLine),
          }}
          options={{
            interaction: {
              intersect: false,
              mode: "index",
            },
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Thống kê so sánh từng năm",
              },
            },
          }}
        />
      </Box>
      <Box>
        <Doughnut width={50} height={50} data={covertToDatasetPie(chartPie)} />
      </Box>
    </Box>
  );
};

export default Analytics;
