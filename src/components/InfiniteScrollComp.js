import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./loadingSpinner/Spinner";
import { CurrencyCard } from "./CurrencyCard/CurrencyCard";
import { stateCoinsContext } from "./App";

export default function InfiniteScrollComp(props) {
  const [isLoading, setLoading] = useState(false);
  const { selectedCoin, moreItems, numOfPages, stateCoins, scrollParentRef } = useContext(stateCoinsContext)

  // moreItems: [moreItems, setMoreItems],
  // numOfPages: [numOfPages, setnumOfPages],
  // stateCoins: [stateValues, setStateValues],
  // scrollParentRef: scrollParentRef

  useEffect(() => {
    if (!props.numOfPages) {
      getAllCoinsList().then((responseAllCoins) => {
        props.setnumOfPages(Math.ceil(responseAllCoins.length / 250));
      });
    }
  }, []);

  useEffect(() => {
    console.log("load changed :", isLoading);
  }, [isLoading]);

  //when re-renders it defaults state weeird
  const fetchData = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    console.log("FETCH aaaa:", moreItems);
    if (props.stateValues.page > props.numOfPages) {
      moreItems.setMoreItems(false);
    }
    getCoins(props.stateValues.page).then((responseCoins) => {
      props.setStateValues((prevState) => {
        return {
          coins: prevState.coins.concat(responseCoins),
          page: prevState.page + 1,
        };
      });
    });
  };
  return (
    <div>
      {console.log("REEEF", props.scrollParentRef)}

      {isLoading && <Spinner />}
      {props.numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={moreItems}
          getScrollParent={() => props.scrollParentRef.current}
          useWindow={false}
        >
          {console.log(props.stateValues.coins)}

          <CurrencyCard coins={props.stateValues.coins} />

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
