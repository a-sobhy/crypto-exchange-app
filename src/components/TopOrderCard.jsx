import { Box, Typography } from "@mui/material";
import React from "react";

const TopOrderCard = ({ tickerData, price, quant, type }) => {
  return (
    <Box
      boxShadow="0 0 9px -6px #04064c"
      padding={1}
      borderRadius={2}
      width="100%"
    >
      <Typography variant="h6">Best {type}</Typography>
      {tickerData ? (
        <Box
          borderTop="1px solid #f1f1f1"
          display="flex"
          position="relative"
          padding={2}
        >
          <Box width="100%" textAlign="center">
            <Typography variant="h6" fontWeight={600}>
              {price}
            </Typography>
            <Typography>{type} price</Typography>
          </Box>
          <Box width="100%" textAlign="center">
            <Typography variant="h6" fontWeight={600}>
              {quant}
            </Typography>
            <Typography>{type} quantity</Typography>
          </Box>
        </Box>
      ) : (
        <Typography>No bids available</Typography>
      )}
    </Box>
  );
};

export default TopOrderCard;
