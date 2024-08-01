import React, { memo } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import ReactTradingviewWidget from "react-tradingview-widget";

const TradingViewPriceChartWidget = ({ currencyPair }) => {
  const tradingViewSymbol = currencyPair.replace("-", "");

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{currencyPair} - Price Chart</Typography>
        <Box width="100%" height={400}>
          <ReactTradingviewWidget
            symbol={tradingViewSymbol}
            // theme="dark"
            interval="1"
            autosize
            style={{
              background: "#f00",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(TradingViewPriceChartWidget);
