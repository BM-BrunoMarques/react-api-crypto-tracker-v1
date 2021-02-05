import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllCoinsList } from "../utils/api";
// import { ReactAutocomplete } from "react-autocomplete";

export default function SearchBar(props) {
  const [searchCoins, setCoins] = useState({});
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState(false);

  /*Hooks from Props*/
  const [selectedCoin, setSelectedCoin] = useState(props.selectCoinHook);
  useEffect(() => {
    setSelectedCoin(props.selectCoinHook);
  }, [props.selectCoinHook]);
  //.

  useEffect(() => {
    getAllCoinsList().then((coins) => {
      setCoins(coins);
    });
  }, []);

  useEffect(() => {
    setDisplay(() => Boolean(searchText));
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleOnBlur = () => {
    setDisplay(false);
  };

  const handleSelectedCoin = (e) => {
    props.handleSelectCoin(e.target.value);
  };

  return (
    <div>
      {searchCoins && (
        <div onBlur={handleOnBlur}>
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
