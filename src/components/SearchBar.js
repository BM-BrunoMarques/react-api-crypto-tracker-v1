import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getAllCoinsList } from "../utils/api";
import { AutoComplete } from "antd";
import { Sorter } from "./AutoComplete/Sorter";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";

export default function SearchBar(props) {
  //useContext
  const { selectedCoinC, isLoadingC, searchTextC } = useContext(
    stateCoinsContext
  );
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [isLoading, setLoading] = isLoadingC;
  const [searchText, setSearchText] = searchTextC;
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
    setSearchText('');
  };

  const onSearch = (searchText) => {
    setSearchText(searchText);
    const filteredOptions = Sorter(searchCoins, searchText);
    setOptions(filteredOptions);
  };

  return (
    <div>
      {searchCoins && (
        <div>
          <AutoComplete
            placeholder='Looking for a specific coin?'
            value={searchText}
            options={searchOptions || []}
            onSelect={onSelect}
            onSearch={onSearch}
            backfill={true}
            disabled={isLoading}
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
