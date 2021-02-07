import "../App.css";
import React, { useState, useEffect } from "react";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

export default function Home() {
  // const [selectedCoin, setSelectedCoin] = useState("");

  // useEffect(() => {
  //   if(Boolean(searchText)){

  //   }else{

  //   }
  // }, [selectedCoin]);

  return (
    <div>
      <div>
        <InfiniteScrollComp />
        {/* {!selectedCoin ? (
          <InfiniteScrollComp />
        ) : (
          <Coin
            selectedCoin={selectedCoin}
            setSelectedCoin={(coin) => setSelectedCoin(coin)}
          />
        )} */}
      </div>
    </div>
  );
}
