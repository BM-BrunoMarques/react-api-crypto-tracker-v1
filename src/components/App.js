import "../App.css";
import React, { useState, useEffect } from "react";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";
import Coin from "./Coin";
// import { Router, Route } from "react-router-dom";

function App() {
  const [selectedCoin, setSelectedCoin] = useState("");

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div>
      <div>
        <SearchBar
          selectCoinHook={selectedCoin}
          handleSelectCoin={handleSelectCoin}
        />
        {!selectedCoin 
        ?<InfiniteScrollComp />
         : <Coin handleSelectCoin={handleSelectCoin} selectCoinHook={selectedCoin} />
        }
      </div>
    </div>
  );
}

export default App;
