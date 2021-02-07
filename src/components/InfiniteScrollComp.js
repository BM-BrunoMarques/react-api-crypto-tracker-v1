import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";

function InfiniteScrollComp(props) {
 
  const [moreItems, setMoreItems] = useState(true);
  const [page, setPage] = useState(1);
  const [numOfPages, setnumOfPages] = useState();

  useEffect(() => {
    getAllCoinsList().then((responseAllCoins) => {
      props.setnumOfPages(Math.ceil(responseAllCoins.length / 250));
    });
  }, []);

  const fetchData = () => {
    console.log("page", props.page);
    props.setMoreItems(props.page <= props.numOfPages);
    setTimeout(() => {
      getCoins(props.page).then((responseCoins) => {
        props.setPage((prevPage) => prevPage + 1);
        props.setCoins((prevCoins) => prevCoins.concat(responseCoins));
      });
    }, 100);
  };
  console.log("PROPS", props);
  return (
    <div>
      {props.numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={props.moreItems}
          loader={<h4 key={0}>Loading...</h4>}
        >
          {props.coins.map((item, indx) => (
            <div key={item.id.concat(indx)}> {item.image} </div>
          ))}
          {!props.moreItems && (
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
