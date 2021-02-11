import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./loadingSpinner/Spinner";
import { CurrencyCard } from "./CurrencyCard/CurrencyCard";
import { stateCoinsContext } from "./App";
import { Table, Avatar } from "antd";
import TableScroll from "./TableScroll/TableScroll";

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
    if (isLoading || !moreItems) return;
    //
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
      {numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={moreItems}
          getScrollParent={() => scrollParentRefC.current}
          useWindow={false}
        >
          <TableScroll/>
          {/* <CurrencyCard coins={stateValues.coins} /> */}
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
