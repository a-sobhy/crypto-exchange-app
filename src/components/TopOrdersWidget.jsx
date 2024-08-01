import React, { memo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useReactWebsocket from "../hooks/useCoinbaseWebSocket";
import TopOrderCard from "./TopOrderCard";

const TopOfBookWidget = ({ currencyPair }) => {
  const { tickerData } = useReactWebsocket(currencyPair);
  const { best_ask, best_ask_quantity, best_bid, best_bid_quantity } =
    tickerData;
  useEffect(() => {
    if (tickerData) {
      console.log("tickerData top of book", tickerData);
    }
  }, [tickerData]);

  return (
    <>
      <Typography variant="h5">{currencyPair} - Top of Book</Typography>
      <Box display="flex" gap={2} width="100%">
        <TopOrderCard
          tickerData={tickerData}
          price={best_bid}
          quant={best_bid_quantity}
          type="Bid"
        />
        <TopOrderCard
          tickerData={tickerData}
          price={best_ask}
          quant={best_ask_quantity}
          type="Ask"
        />
      </Box>
    </>
  );
};

export default memo(TopOfBookWidget);
