import "../App.css";
import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";
import { Spinner } from "./loadingSpinner/Spinner";

function Coin(props) {
  const { selectedCoinC, isLoadingC } = useContext(stateCoinsContext);
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [isLoading, setLoading] = isLoadingC;

  const history = useHistory();

  const { coinId } = props.history.location;

  useEffect(() => {
    const urlSlice = props.location.pathname.split("/").pop();
    if (!selectedCoin || selectedCoin !== urlSlice) {
      if (urlSlice !== "/coin") {
        setSelectedCoin(urlSlice);
      } else if (!coinId) {
        setSelectedCoin(coinId);
      } else {
        history.push("/");
      }
    }
  }, []);

  const handleClick = async () => {
    await setLoading(true);
    setTimeout(() => {
      history.push("/");
    }, 10);
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <button onClick={handleClick}>back to Coins</button>
    </div>
  );
}

export default Coin;
