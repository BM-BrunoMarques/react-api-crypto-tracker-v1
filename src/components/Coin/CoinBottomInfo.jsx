import "../../App.css";
import "./Coin.css";
import React, { useState, useContext, useEffect } from "react";
import {
  formatPrice,
  formatPercentage,
  formatNumber,
  formatDate,
  renderBottomInfo,
} from "../../utils/helpers";

export default function CoinBottomInfo(props) {
  const [coinDataTable, setCoinDataTable] = useState();

  const typeMoney = formatPrice;
  const typePercent = formatPercentage;
  const typeNumber = formatNumber;
  const typeDate = formatDate;

  function DataObj(data, label, type, addClass) {
    return data, label, type, addClass;
  }
  const dataArr = [];

  const constructData = (data, label, type) => {
    const coinInfo = new DataObj();
    if (typeof data === "object") {
      const dataObject = [];
      data.map((dt) => {
        const splitData = dt.split(".");
        dataObject.push(splitData.reduce((a, b) => a[b], props.coinData));

        coinInfo.addClass = splitData[Math.floor(splitData.length / 2)];
      });
      coinInfo.data = dataObject;
    } else {
      const splitData = data.split(".");
      const dataString = splitData.reduce((a, b) => a[b], props.coinData);
      coinInfo.data = dataString;

      coinInfo.addClass = splitData[Math.floor(splitData.length / 2)];
    }

    coinInfo.label = label;
    coinInfo.type = type;

    dataArr.push(coinInfo);
  };

  useEffect(() => {
    (async function () {
      if (props.coinData) {
        const { coinData } = props;
        const { symbol } = coinData;
        constructData(
          "market_data.current_price.usd",
          `${symbol.toUpperCase()} Price`,
          typeMoney
        );
        constructData(
          ["market_data.high_24h.usd", "market_data.low_24h.usd"],
          "24h Low / 24h High",
          [typeMoney, typeMoney]
        );
        constructData(
          [
            "market_data.ath.usd",
            "market_data.ath_change_percentage.usd",
            "market_data.ath_date.usd",
          ],
          "All-Time High",
          [typeMoney, typePercent, typeDate]
        );
        constructData(
          [
            "market_data.atl.usd",
            "market_data.atl_change_percentage.usd",
            "market_data.atl_date.usd",
          ],
          "All-Time Low",
          [typeMoney, typePercent, typeDate]
        );
        setCoinDataTable(dataArr);
      }
    })();
  }, []);

  console.log("table", coinDataTable);
  return (
    <div>
      {coinDataTable && (
        <div>
          <div className="bottomInfo">
            <div className="container">
              <div className="title">Bitcoin Price and Market Stats</div>
              {coinDataTable.map((row) => renderBottomInfo(row))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
