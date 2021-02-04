import "../App.css";
import React, { useState, useEffect } from "react";
import { getCoins, getAllCoinsList } from "../utils/api.js";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

function App() {
  const [coins, setCoins] = useState([]);
  const [moreItems, setMoreItems] = useState(true);
  const [page, setPage] = useState(22);
  const [numOfPages, setnumOfPages] = useState();

  useEffect(() => {
    getAllCoinsList().then((responseAllCoins) => {
      
      setnumOfPages(Math.ceil(responseAllCoins.length / 250));
    });
  }, []);

  const fetchData = () => {
    setMoreItems(page <= numOfPages);
    setTimeout(async () => {
      getCoins(page).then((resposeCoins) => {
        setCoins((prevCoins) => prevCoins.concat(resposeCoins));
        setPage((prevPage) => prevPage + 1);
      });
    }, 900);
  };

  return (
    <div>
      {numOfPages && (
        <div>
          <SearchBar />
          <InfiniteScrollComp
            items={coins}
            moreItems={moreItems}
            fetchData={fetchData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
