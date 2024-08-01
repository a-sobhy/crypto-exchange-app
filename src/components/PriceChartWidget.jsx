import React, { useState, useEffect, memo } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import useCoinbaseWebSocket from "../hooks/useCoinbaseWebSocket";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const PriceChartWidget = ({ currencyPair, interval }) => {
  const { orderBook } = useCoinbaseWebSocket(currencyPair, interval);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    if (
      orderBook &&
      orderBook?.bids?.length > 0 &&
      orderBook?.offers?.length > 0
    ) {
      const bestBid = orderBook.bids[0].price;
      const bestAsk = orderBook.offers[0].price;
      const currentTime = new Date().toLocaleTimeString();

      setPriceData((prevData) => {
        const newData = [...prevData, { time: currentTime, bestBid, bestAsk }];
        if (newData.length > 10) {
          newData.shift();
        }
        return newData;
      });
    }
  }, [orderBook]);

  const chartData = {
    labels: priceData.map((d) => d.time),
    datasets: [
      {
        label: "Bid",
        data: priceData.map((d) => d.bestBid),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        fill: true,
      },
      {
        label: "Ask",
        data: priceData.map((d) => d.bestAsk),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    spanGaps: true,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return (
    <Box boxShadow="0 0 9px -6px #04064c" padding={2} borderRadius={2}>
      <Typography variant="h5">{currencyPair} - Price Chart</Typography>
      <Line data={chartData} options={chartOptions} height="100%" />
    </Box>
  );
};

export default memo(PriceChartWidget);
