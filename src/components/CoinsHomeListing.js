import "../App.css";
import React, { useEffect, useContext, useRef } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./loadingSpinner/Spinner";
import { stateCoinsContext } from "./App";
import TableScroll from "./TableScroll/TableScroll";

export default function CoinsHomeListing(props) {
  const {
    moreItemsC,
    numOfPagesC,
    stateCoinsC,
    isLoadingC,
    scrollParentRefC,
    selectedCoinC,
  } = useContext(stateCoinsContext);
  const scrollParentRef = useRef(null);

  const [selectedCoin] = selectedCoinC;
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

    setLoading(false)
  }, []);

  const fetchData = () => {
    if (isLoading || !moreItems) return;
    //
    setLoading(true);
    if (stateValues.page > numOfPages) {
      setMoreItems(false);
    }
    getCoins(stateValues.page).then((responseCoins) => {
      console.log("fetched");

      setStateValues((prevState) => {
        return {
          coins: prevState.coins
            .concat(responseCoins)
            .filter((val, id, array) => array.indexOf(val) === id),
          page: prevState.page + 1,
        };
      });
      setLoading(false);
    });
  };
  return (
    <div
      ref={scrollParentRef}
      style={{
        minHeight: "500px",
        maxHeight: "70vh",
        overflowY: "scroll",
      }}
    >
      {isLoading && <Spinner tip='Fetching more coins...' />}

      
      {numOfPages && (
        <InfiniteScroll
          loadMore={fetchData}
          hasMore={moreItems}
          getScrollParent={() => scrollParentRefC.current}
          useWindow={false}
        >
          <TableScroll />
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
