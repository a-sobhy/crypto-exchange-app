import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "wss://advanced-trade-ws.coinbase.com";

const useCoinbaseWebSocket = (currencyPair, interval) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection opened"),
  });

  const [orderBook, setOrderBook] = useState({ bids: [], offers: [] });
  const [tickerData, setTickerData] = useState({ bids: [], offers: [] });

  useEffect(() => {
    if (currencyPair) {
      const l2Message = {
        type: "subscribe",
        product_ids: [currencyPair],
        channel: "level2",
      };
      const tickerMessage = {
        type: "subscribe",
        product_ids: [currencyPair],
        channel: "ticker",
      };

      sendJsonMessage(l2Message);
      sendJsonMessage(tickerMessage);
    }
  }, [currencyPair, sendJsonMessage]);

  // Throttling function to control data processing speed

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.channel === "l2_data") {
      const updatedBids = [];
      const updatedOffers = [];
      const data = lastJsonMessage.events;
      data.forEach((event) => {
        if (event.type === "update") {
          event.updates.forEach((update) => {
            const { side, price_level, new_quantity } = update;
            const price = parseFloat(price_level);
            const quantity = parseFloat(new_quantity);

            if (side === "bid") {
              updatedBids.push({ price, quantity });
            } else if (side === "offer") {
              updatedOffers.push({ price, quantity });
            }
          });
        }
      });

      setOrderBook({
        bids: updatedBids.sort((a, b) => b.price - a.price),
        offers: updatedOffers.sort((a, b) => a.price - b.price),
      });
    } else if (lastJsonMessage && lastJsonMessage.channel === "ticker") {
      const event = lastJsonMessage.events[0];
      const { type, tickers } = event;
      if (type === "update") {
        setTickerData(tickers[0]);
      }
    }
  }, [lastJsonMessage]);

  return { orderBook, tickerData };
};

export default useCoinbaseWebSocket;
