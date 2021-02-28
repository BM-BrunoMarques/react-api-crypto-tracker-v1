import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { getAllCoinsList } from "../utils/api";
import { AutoComplete, Button } from "antd";
import { Sorter } from "./AutoComplete/Sorter";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "./App";
import { RollbackOutlined } from "@ant-design/icons";

export default function SearchBar(props) {
  //useContext
  const { selectedCoinC, isLoadingC, searchTextC } = useContext(
    stateCoinsContext
  );
  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [, setLoading] = isLoadingC;
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
  };

  const onSearch = (searchText) => {
    setSearchText(searchText);
    const filteredOptions = Sorter(searchCoins, searchText);
    setOptions(filteredOptions);
  };

  const handleClick = () => {
    (async function () {
      setLoading({
        load: true,
        tip: `Taking you back...`,
      });
      history.push("/");
      setLoading({
        load: false,
      });
      setSearchText("");
      setSelectedCoin("");
    })();
  };
  return (
    <div style={{ height: "100%" }}>
      {searchCoins && (
        <div className="searchBar">
          {selectedCoin && (
            <Button
              onClick={handleClick}
              type="primary"
              icon={<RollbackOutlined />}
              size="big"
            >
              back to Coins
            </Button>
          )}
          <AutoComplete
            placeholder="Looking for a specific coin?"
            value={searchText}
            options={searchOptions || []}
            onSelect={onSelect}
            onSearch={onSearch}
            backfill={true}
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
