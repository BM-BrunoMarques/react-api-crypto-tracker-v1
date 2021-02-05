import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllCoinsList } from "../utils/api";
// import { ReactAutocomplete } from "react-autocomplete";

export default function SearchBar() {
  const [searchCoins, setCoins] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    getAllCoinsList().then((coins) => {
      setCoins(coins);
    });
  }, []);
  
  useEffect(() => {
    setDisplay(() => Boolean(searchText))
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleOnBlur = () => {
    setDisplay(false);
  };

  return (
    <div>
      {searchCoins && (
        <div>
          <input
            value={searchText}
            onBlur={handleOnBlur}
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
                .map((key) => key.name)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
