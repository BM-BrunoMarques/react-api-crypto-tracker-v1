import "../App.css";
import React, { useState, useEffect } from "react";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";
import Coin from "./Coin";
// import { Router, Route } from "react-router-dom";

function App() {
  const [selectedCoin, setSelectedCoin] = useState("");

  return (
    <div>
      <div>
        <SearchBar
          selectedCoin={selectedCoin}
          setSelectedCoin={(coin) => setSelectedCoin(coin)}
        />
        {!selectedCoin ? (
          <InfiniteScrollComp />
        ) : (
          <Coin
            selectedCoin={selectedCoin}
            setSelectedCoin={(coin) => setSelectedCoin(coin)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
