import "../App.css";
import React, { useState, useEffect } from "react";

function Coin(props) {
  /*Hooks from Props*/
  const [selectedCoin, setSelectedCoin] = useState(props.selectCoinHook);
  console.log('coin',selectedCoin)
  useEffect(() => {
    setSelectedCoin(props.selectCoinHook);
  }, [props.selectCoinHook]);
  //.

  const handleSelectedCoin = () => {
    props.handleSelectCoin('');
  };

  return <button onClick={handleSelectedCoin}> {selectedCoin} </button>;
}

export default Coin;
