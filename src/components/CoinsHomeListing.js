import "../App.css";
import React, { useEffect, useContext, useRef } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./loadingSpinner/Spinner";
import { stateCoinsContext } from "./App";
import { CurrencyCard } from "./CurrencyCard/CurrencyCard";
import TableScroll from "./TableScroll/TableScroll";

export default function CoinsHomeListing(props) {
  const {
    moreItemsC,
    numOfPagesC,
    stateCoinsC,
    isLoadingC,
    scrollParentRefC,
    selectedCoinC,
    scrollPositionC,
    fetchDataFunctionC,
  } = useContext(stateCoinsContext);
  const scrollParentRef = useRef(null);

  const [selectedCoin] = selectedCoinC;
  const [moreItems, setMoreItems] = moreItemsC;
  const [numOfPages, setnumOfPages] = numOfPagesC;
  const [stateValues, setStateValues] = stateCoinsC;
  const [isLoading, setLoading] = isLoadingC;
  const [scrollPosition, setScrollPosition] = scrollPositionC;
  const [fetchDataFunction, setFetchData] = fetchDataFunctionC;
  //
  const tip = "";

  useEffect(() => {
    if (!numOfPages) {
      getAllCoinsList().then((responseAllCoins) => {
        setnumOfPages(Math.ceil(responseAllCoins.length / 250));
      });
    }
    if (!fetchDataFunction) {
      setFetchData(() => fetchData);
      fetchData();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(false);
    if (scrollPosition) {
      document?.getElementById(scrollPosition)?.scrollIntoView();
    }
  }, [selectedCoin]);

  const fetchData = () => {
    if (!moreItems || selectedCoin) return;

    setLoading({
      load: true,
      tip: "Fetching Coins...",
    });
    if (stateValues.page > numOfPages) {
      setMoreItems(false);
    }
    getCoins(stateValues.page).then((responseCoins) => {
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
    <div className="CoinsListingContainer">
      {isLoading.load && <Spinner tip={isLoading.tip} />}

      {numOfPages && (
        <div>
          <TableScroll />
          {!moreItems && (
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all...</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
