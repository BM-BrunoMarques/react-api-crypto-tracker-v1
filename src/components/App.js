import "../App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin";
import Home from "./Home";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [state, setState] = useState({
    coins: [],
    page: 1,
  });
  const [page, setPage] = useState(1);

  const [selectedCoin, setSelectedCoin] = useState("");
  //
  const [moreItems, setMoreItems] = useState(true);
  const [numOfPages, setnumOfPages] = useState();

  return (
    <Router>
      <SearchBar
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
      <Route
        path="/"
        exact
        component={() => (
          <InfiniteScrollComp
            setStateValues={setState}
            stateValues={state}
            setMoreItems={setMoreItems}
            moreItems={moreItems}
            numOfPages={numOfPages}
            setnumOfPages={setnumOfPages}
          />
        )}
      />
      <Route path="/coin" exact component={Coin} />
    </Router>
  );
}

export default App;
