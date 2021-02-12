import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getAllCoinsList } from "../utils/api";
import { AutoComplete } from "antd";
import { Sorter } from "./AutoComplete/Sorter";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";

export default function SearchBar(props) {
  //useContext
  const { selectedCoinC } = useContext(stateCoinsContext);
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  //useState
  const [searchCoins, setCoins] = useState([]);
  const [searchOptions, setOptions] = useState([]);
  const history = useHistory();

  //Hooks
  useEffect(() => {
    getAllCoinsList().then((coins) => {
      setCoins(coins);
    });
  }, []);

  const onSelect = (data) => {
    setSelectedCoin(data);
    history.push({
      pathname: "/coin/" + data,
    });
  };

  const onSearch = (searchText) => {
    const filteredOptions = Sorter(searchCoins, searchText);
    setOptions(filteredOptions);
  };

  return (
    <div>
      {searchCoins && (
        <div>
          <AutoComplete
            options={searchOptions || []}
            onSelect={onSelect}
            onSearch={onSearch}
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
