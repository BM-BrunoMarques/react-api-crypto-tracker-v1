import "../App.css";
import React, { useState, useEffect, useRef, createContext } from "react";
import Coin from "./Coin";
import Home from "./Home";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

import { BrowserRouter as Router, Route } from "react-router-dom";

export const stateCoinsContext = createContext();

function App() {
  const scrollParentRef = useRef(null);

  const [stateValues, setStateValues] = useState({
    coins: [],
    page: 1,
    isLoading: false,
  });
  const [page, setPage] = useState(1);

  const [selectedCoin, setSelectedCoin] = useState("");
  const [moreItems, setMoreItems] = useState(true);
  const [numOfPages, setnumOfPages] = useState();

  // const store = {
  //   sharing: [sharing, setSharing],
  //   help: [help, setHelp],
  //   pairing: [pairing, setPairing],
  // };
  const coinsStoreContext = {
    selectedCoin: [selectedCoin, setSelectedCoin],
    moreItems: [moreItems, setMoreItems],
    numOfPages: [numOfPages, setnumOfPages],
    stateCoins: [stateValues, setStateValues],
    scrollParentRef: scrollParentRef
  };

  return (
    <Router>
      <SearchBar
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
      <stateCoinsContext.Provider value={coinsStoreContext}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            ref={scrollParentRef}
            style={{ width: "600px", height: "750px", overflowY: "scroll" }}
          >
            <Route
              path="/"
              exact
              component={() => (
                <InfiniteScrollComp
                  scrollParentRef={scrollParentRef}
                  setStateValues={setStateValues}
                  stateValues={stateValues}
                  setMoreItems={setMoreItems}
                  moreItems={moreItems}
                  numOfPages={numOfPages}
                  setnumOfPages={setnumOfPages}
                />
              )}
            />
          </div>
        </div>
        <Route path="/coin" exact component={Coin} />
      </stateCoinsContext.Provider>
    </Router>
  );
}

export default App;
