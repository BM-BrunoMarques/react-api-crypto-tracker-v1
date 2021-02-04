import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllCoinsList } from "../utils/api";


export default function SearchBar() {
  const [items, setItems] = useState();
  useEffect(() => {
    getAllCoinsList().then((coins) => {
      setItems(coins);
    });
  }, []);

  return (
    <div>
      {items?.map((item) => item.id)}
    </div>
  );
}
