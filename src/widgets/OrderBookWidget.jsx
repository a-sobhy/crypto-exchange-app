import React, { memo } from "react";
import OrderBook from "../components/OrderBookWidget";
import useCoinbaseWebSocket from "../hooks/useCoinbaseWebSocket";

const OrderBookWidget = ({ currencyPair, interval }) => {
  const { orderBook } = useCoinbaseWebSocket(currencyPair, interval);

  return (
    <div className="order-book-widget">
      <h1>{currencyPair} Order Book</h1>
      <OrderBook orderBook={orderBook} />
    </div>
  );
};

export default memo(OrderBookWidget);
