import "../App.css";
import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";
import { Spinner } from "./loadingSpinner/Spinner";

function Coin(props) {
  const {
    selectedCoinC,
    isLoadingC,
    searchTextC,
    scrollPositionC,
  } = useContext(stateCoinsContext);

  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [isLoading, setLoading] = isLoadingC;
  const [searchText, setSearchText] = searchTextC;
  const [scrollPosition, setScrollPosition] = scrollPositionC;

  const history = useHistory();

  const { coinId } = props.history.location;

  useEffect(() => {
    const urlSlice = props.location.pathname.split("/").pop();
    if (!selectedCoin || selectedCoin !== urlSlice) {
      if (urlSlice !== "/coin") {
        setSelectedCoin(urlSlice);
        setScrollPosition(urlSlice);
      } else if (!coinId) {
        setSelectedCoin(coinId);
        setScrollPosition(coinId);
      } else {
        history.push("/");
        setSelectedCoin("");
      }
    }
  }, []);

  const handleClick = async () => {
    setLoading(true);
    //CHANGE
    setTimeout(() => {
      history.push("/");
      setSearchText("");
      setSelectedCoin("");
    }, 10);
    //
  };

  return (
    <div>
      {selectedCoin && (
        <div
          style={{
            backgroundColor: "red",
            width: "90vw",
            height: "90vh",
            top: "5vh",
            left: "5vw",
            position: "fixed",
            zIndex: "9",
          }}
        >
          {isLoading ? <Spinner tip="Taking you back" /> : null}
          <button onClick={handleClick}>back to Coins</button>
        </div>
      )}
    </div>
  );
}

export default Coin;
