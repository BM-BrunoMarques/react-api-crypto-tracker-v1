import "../../App.css";
import React, { useEffect, useContext } from "react";
import { getCoins, getAllCoinsList } from "../../utils/api.js";
import { Spinner } from "../loadingSpinner/Spinner";
import { stateCoinsContext } from "../App";
import { endOfContentLabel } from "../../utils/const";
import TableScroll from "./TableScroll/TableScroll";

export default function CoinsHomeListing(props) {
  const {
    moreItemsC,
    numOfPagesC,
    stateCoinsC,
    isLoadingC,
    selectedCoinC,
    scrollPositionC,
    fetchDataFunctionC,
  } = useContext(stateCoinsContext);

  const [selectedCoin] = selectedCoinC;
  const [moreItems, setMoreItems] = moreItemsC;
  const [numOfPages, setnumOfPages] = numOfPagesC;
  const [stateValues, setStateValues] = stateCoinsC;
  const [isLoading, setLoading] = isLoadingC;
  const [scrollPosition, ] = scrollPositionC;
  const [fetchDataFunction, ] = fetchDataFunctionC;
  //

  useEffect(() => {
    if (!numOfPages) {
      getAllCoinsList().then((responseAllCoins) => {
        setnumOfPages(Math.ceil(responseAllCoins.length / 250));
      });
    }
    if (!fetchDataFunction) {
      fetchData();
    }
  }, []);

  useEffect(() => {
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
          ...prevState,
          coins: [...prevState.coins, ...responseCoins],
          page: prevState.page + 1,
        };
      });
      setLoading(false);
    });
  };

  return (
    <div>
      {isLoading.load && <Spinner tip={isLoading.tip} />}

      {numOfPages && (
        <div>
          <TableScroll fetchData={fetchData} />
          {!moreItems && (
            <p style={{ textAlign: "center" }}>
              <b>{endOfContentLabel}</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
