import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllCoinsList } from "../utils/api";

export default function SearchBar(props) {
  const [searchCoins, setCoins] = useState({});
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState(false);

  // Hooks from props
  const [selectedCoin, setSelectedCoin, setSelect] = useState(
    props.selectCoinHook
  );
  useEffect(() => {
    setSelectedCoin(props.selectedCoin);
    setDisplay(false);
  }, [props.selectedCoin]);

  //Hooks
  useEffect(() => {
    getAllCoinsList().then((coins) => {
      setCoins(coins);
    });
  }, []);

  useEffect(() => {
    setDisplay(() => Boolean(searchText));
  }, [searchText]);

  //Functions
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectedCoin = async (e) => {
    await props.setSelectedCoin(e.target.value);
    setSearchText("");
  };

  return (
    <div>
      {searchCoins && (
        <div>
          <input
            value={searchText}
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="Search for a coin"
          />
          {display && (
            <div className="autoCompleteContainer">
              {Object.values(searchCoins)
                .filter((key) =>
                  key.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((key, ind) => {
                  return (
                    <button
                      key={key.id.concat(ind)}
                      value={key.name}
                      onClick={(e) => handleSelectedCoin(e)}
                    >
                      {key.name}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
