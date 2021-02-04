import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllCoinsList } from "../utils/api";
// import { ReactAutocomplete } from "react-autocomplete";

export default function SearchBar() {
  const [items, setItems] = useState({});

  useEffect(() => {
    getAllCoinsList().then((coins) => {
      let searchCoins = []
      coins.map((coin) => {
        searchCoins.push( {[coin.id]: coin.name} ) ;
      });

      setItems(searchCoins);

    });
  }, []);

  return <div>{/* {items?.map((item) => item.name)} */}</div>;
}
