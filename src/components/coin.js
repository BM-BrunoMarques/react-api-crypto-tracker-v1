import "../App.css";
import React, { useState, useEffect } from "react";

function Coin(props) {
  // Hooks from props
  const [selectedCoin, setSelectedCoin] = useState(props.selectCoinHook);
  useEffect(() => {
    setSelectedCoin(props.selectedCoin);
  }, [props.selectedCoin]);

  const handleSelectedCoin = () => {
    props.setSelectedCoin("");
  };

  return <button onClick={handleSelectedCoin}> {selectedCoin} </button>;
}

export default Coin;
