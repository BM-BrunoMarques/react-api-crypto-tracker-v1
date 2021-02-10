import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./loadingSpinner/Spinner";
import { CurrencyCard } from "./CurrencyCard/CurrencyCard";
import { stateCoinsContext } from "./App";

export default function InfiniteScrollComp(props) {
  const {
    moreItemsC,
    numOfPagesC,
    stateCoinsC,
    isLoadingC,
    scrollParentRefC,
    selectedCoinC,
  } = useContext(stateCoinsContext);
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [moreItems, setMoreItems] = moreItemsC;
  const [numOfPages, setnumOfPages] = numOfPagesC;
  const [stateValues, setStateValues] = stateCoinsC;
  const [isLoading, setLoading] = isLoadingC;

  useEffect(() => {
    if (!numOfPages) {
      getAllCoinsList().then((responseAllCoins) => {
        setnumOfPages(Math.ceil(responseAllCoins.length / 250));
      });
    }

    if (selectedCoin) {
      document?.getElementById(selectedCoin)?.scrollIntoView();
    }
  }, []);

  const fetchData = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (stateValues.page > numOfPages) {
      setMoreItems(false);
    }
    getCoins(stateValues.page).then((responseCoins) => {
      setStateValues((prevState) => {
        return {
          coins: prevState.coins.concat(responseCoins),
          page: prevState.page + 1,
        };
      });
      setLoading(false);
    });
  };
  return (
    <div>
      {isLoading && <Spinner />}
      {/* {<Spinner />} */}
      {numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={moreItems}
          getScrollParent={() => scrollParentRefC.current}
          useWindow={false}
        >
          <CurrencyCard coins={stateValues.coins} />

          {/* {props.moreItems ? (
            <div className="demo-loading-container">
              <Spin tip="Fetching more Coins..." size="large" />
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all...</b>
            </p>
          )} */}
        </InfiniteScroll>
      )}
    </div>
  );
}
