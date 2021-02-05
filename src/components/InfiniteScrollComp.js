import "../App.css";
import React, { useState, useEffect } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";

function InfiniteScrollComp() {
  const [coins, setCoins] = useState([]);
  const [moreItems, setMoreItems] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setnumOfPages] = useState();

  useEffect(() => {
    getAllCoinsList().then((responseAllCoins) => {
      setnumOfPages(Math.ceil(responseAllCoins.length / 250));
    });
  }, []);

  const fetchData = () => {
    setMoreItems(page <= numOfPages);
    setTimeout(() => {
      getCoins(page).then((responseCoins) => {
        setCoins((prevCoins) => prevCoins.concat(responseCoins));
        setPage((prevPage) => prevPage + 1);
      });
    }, 900);
  };

  return (
    <div>
      {numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={moreItems}
          loader={<h4 key={0}>Loading...</h4>}
        >
          {coins.map((item, indx) => (
            <div key={item.id.concat(indx)}> {item.image} </div>
          ))}
          {!moreItems && (
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all...</b>
            </p>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default InfiniteScrollComp;
