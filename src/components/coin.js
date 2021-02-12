import "../App.css";
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";

function Coin(props) {
  const { selectedCoinC } = useContext(stateCoinsContext);
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
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

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div>
      <button onClick={() => handleClick()}>{selectedCoin}</button>
    </div>
  );
}

export default Coin;
