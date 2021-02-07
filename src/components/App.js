import "../App.css";
import React, { useState, useEffect } from "react";
import Coin from "./Coin";
import Home from "./Home";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  //
  const [moreItems, setMoreItems] = useState(true);
  const [page, setPage] = useState(1);
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
            coins={coins}
            setCoins={setCoins}
            setMoreItems={setMoreItems}
            moreItems={moreItems}
            page={page}
            setPage={setPage}
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
