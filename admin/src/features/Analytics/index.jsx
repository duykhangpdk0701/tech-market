import React, { useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
import { Link } from "react-router-dom";
import { getAllDateOrderAsync } from "../../app/orderSlice";
import toPrice from "../../helper/toPrice";

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

  const listOrder = useSelector((state) => state.orders.currentSta) || [];
  const sum = useSelector((state) => state.orders.sum);

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

    const fetchByDate = async () => {
      const action = await getAllDateOrderAsync();
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
    };

    fetchByDate();
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
      <Typography variant="h3">Th???ng k?? to??n th???i gian</Typography>
      <Box className={style.chart_container}>
        <Box className={style.doughnut}>
          <Typography>Bi???u ????? tr??n </Typography>
          <Doughnut data={covertToDatasetPie(chartPie)} />
        </Box>

        <Box className={style.chart}>
          <Line
            data={{
              labels: [
                "Th??ng 1",
                "Th??ng 2",
                "Th??ng 3",
                "Th??ng 4",
                "Th??ng 5",
                "Th??ng 6",
                "Th??ng 7",
                "Th??ng 8",
                "Th??ng 9",
                "Th??ng 10",
                "Th??ng 11",
                "Th??ng 12",
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
                  text: "Th???ng k?? so s??nh t???ng n??m",
                },
              },
            }}
          />
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ng?????i Mua</TableCell>
                <TableCell>Email ng?????i Mua</TableCell>
                <TableCell>H??nh th???c thanh to??n</TableCell>
                <TableCell>Ng??y mua</TableCell>
                <TableCell>T???ng ti???n</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder.map((item) => {
                return (
                  <>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell>{item.user.username}</TableCell>
                      <TableCell>{item.user.email}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>{item.formattedDate}</TableCell>
                      <TableCell>{toPrice(item.totalPrice)}</TableCell>
                      <TableCell>
                        <Link to={`/admin/order/${item._id}`}>
                          <Button>Chi ti???t</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="h6">T???ng:</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>
                  <Typography variant="h6">{toPrice(sum)}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Analytics;
