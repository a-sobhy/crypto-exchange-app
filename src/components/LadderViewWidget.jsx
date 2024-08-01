import React, { useState, useEffect, memo } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import useCoinbaseWebSocket from "../hooks/useCoinbaseWebSocket";

const orderBookAggregate = (bids, offers, increment) => {
  const aggregatedBids = {};
  const aggregatedOffers = {};

  // Aggregate bids
  bids.forEach((bid) => {
    const price = Math.floor(bid.price / increment) * increment;
    if (!aggregatedBids[price]) {
      aggregatedBids[price] = { price, quantity: 0 };
    }
    aggregatedBids[price].quantity += bid.quantity;
  });

  // Aggregate offers
  offers.forEach((offer) => {
    const price = Math.floor(offer.price / increment) * increment;
    if (!aggregatedOffers[price]) {
      aggregatedOffers[price] = { price, quantity: 0 };
    }
    aggregatedOffers[price].quantity += offer.quantity;
  });

  return {
    bids: Object.values(aggregatedBids).sort((a, b) => b.price - a.price),
    offers: Object.values(aggregatedOffers).sort((a, b) => a.price - b.price),
  };
};
const incrementArr = [0.01, 0.05, 0.1, 0.5, 1];
const LadderViewWidget = ({ currencyPair, interval }) => {
  const { orderBook } = useCoinbaseWebSocket(currencyPair, interval);
  const [increment, setIncrement] = useState(incrementArr[0]);
  const [aggregatedOrderBook, setAggregatedOrderBook] = useState({
    bids: [],
    offers: [],
  });

  useEffect(() => {
    if (orderBook) {
      setAggregatedOrderBook((prevAggregatedOrderBook) => {
        if (prevAggregatedOrderBook.bids.length > 1) {
          prevAggregatedOrderBook.bids.shift();
        }
        if (prevAggregatedOrderBook.offers.length > 1) {
          prevAggregatedOrderBook.offers.shift(); // Remove the oldest data point
        }
        const newAggregated = orderBookAggregate(
          [...prevAggregatedOrderBook.bids, ...orderBook.bids],
          [...prevAggregatedOrderBook.offers, ...orderBook.offers],
          increment
        );
        return newAggregated;
      });
    }
  }, [orderBook, increment]);

  const handleIncrementChange = (event) => {
    setIncrement(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" marginBottom={2}>
        {currencyPair} - Ladder View
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Price Increment</InputLabel>
        <Select
          value={increment}
          onChange={handleIncrementChange}
          size="small"
          label="Price Increment"
        >
          {incrementArr.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" flexDirection="column" height="100%" padding={1}>
        <Box height="50%" overflow="auto">
          <Typography variant="h6">Bids</Typography>
          {aggregatedOrderBook.bids.map((bid, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#f10000",
              }}
            >
              <span>{bid.price}</span>
              <span>{bid.quantity}</span>
            </div>
          ))}
        </Box>
        <Box height="50%" overflow="auto">
          <Typography variant="h6">Offers</Typography>
          {aggregatedOrderBook.offers.map((offer, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#2bae48",
              }}
            >
              <span>{offer.price}</span>
              <span>{offer.quantity}</span>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default memo(LadderViewWidget);
