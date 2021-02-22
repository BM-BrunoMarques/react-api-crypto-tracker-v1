import "../../App.css";
import "./Coin.css";
import React, { useState, useContext, useEffect } from "react";
import { stateCoinsContext } from "../App";
import { Line } from "@ant-design/charts";
import { getSelectedCoin } from "../../utils/api";
import { formatPrice } from "../../utils/helpers";

export default function CoinDataTable(props) {
  const [coinDataTable, setCoinDataTab] = useState();

  {
    /* TABLE
                  BTC Price	$52,170.13
                      Market Cap	$972,022,418,270
                      Market Cap Dominance	60.02%
                      Trading Volume	$67,427,596,400
                      Volume / Market Cap	0.0694
                      24h Low / 24h High	$49,364.64 / $52,547.80
                      7d Low / 7d High	$46,941.29 / $52,143.68
                      All-Time High	$52,547.80 -0.7%
                      Feb 17, 2021 (about 8 hours)
                      All-Time Low	$67.81 76815.4%
                  */
  }

  useEffect(() => {
    (async function () {
      if (props.coinData) {
        setCoinDataTab(props.coinData);
      }
    })();
  }, []);

  return (
    <div>
      {coinDataTable && (
        <div>
          <span>TEXT</span> <span>TEXT</span>
        </div>
      )}
    </div>
  );
}
