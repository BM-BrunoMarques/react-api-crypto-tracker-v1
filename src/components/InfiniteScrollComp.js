import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spin } from "antd";
import ItemList from "./ItemList";

function InfiniteScrollComp(props) {
  useEffect(() => {
    if (!props.numOfPages) {
      getAllCoinsList().then((responseAllCoins) => {
        props.setnumOfPages(Math.ceil(responseAllCoins.length / 250));
      });
    }
  }, []);

  const fetchData = () => {
    if (props.stateValues.page > props.numOfPages) {
      props.setMoreItems(false);
    }
    setTimeout(() => {
      getCoins(props.stateValues.page).then((responseCoins) => {
        props.setStateValues((prevState) => {
          return {
            coins: prevState.coins.concat(responseCoins),
            page: prevState.page + 1,
          };
        });
      });
    }, 900);
  };
  return (
    <div>
      {props.numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={props.moreItems}
          loader={<h4 key={0}>Loading...</h4>}
        >
          {console.log(props.stateValues.coins)}
          <ItemList coins={props.stateValues.coins} />

          {props.moreItems ? (
            <div className="demo-loading-container">
              <Spin tip="Fetching more Coins..." size="large"/>
            </div>
          ) : (
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
