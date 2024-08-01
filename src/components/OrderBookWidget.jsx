import React from "react";

const OrderBook = ({ orderBook }) => {
  const { bids, offers } = orderBook;

  return (
    <div className="order-book">
      <div className="order-book-section">
        <h2>Bids</h2>
        <ul>
          {bids.map((bid, index) => (
            <li key={index}>
              <span>Price: {bid.price.toFixed(2)}</span>
              <span>Quantity: {bid.quantity.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-book-section">
        <h2>Offers</h2>
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>
              <span>Price: {offer.price.toFixed(2)}</span>
              <span>Quantity: {offer.quantity.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;
