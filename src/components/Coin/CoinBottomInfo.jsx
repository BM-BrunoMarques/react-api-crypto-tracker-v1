import "../../App.css";
import "./Coin.css";
import React, { useState, useEffect } from "react";
import {
  formatPrice,
  formatPercentage,
  formatNumber,
  formatDate,
  renderCoinInfo,
} from "../../utils/helpers";

export default function CoinBottomInfo(props) {
  const [coinDataTable, setCoinDataTable] = useState();
  const { selectedCoin } = props;

  const typeMoney = formatPrice;
  const typePercent = formatPercentage;
  const typeNumber = formatNumber;
  const typeDate = formatDate;

  function DataObj(data, label, type, addClass, separator) {
    return data, label, type, addClass, separator;
  }
  const dataArr = [];

  const constructData = ({ data, label, type, separator }) => {
    const coinInfo = new DataObj();
    if (typeof data === "object") {
      const dataObject = [];
      for (let dt of data) {
        const splitData = dt.split(".");
        dataObject.push(splitData.reduce((a, b) => a[b], props.coinData));

        coinInfo.addClass = splitData[Math.floor(splitData.length / 2)];
      }
      coinInfo.data = dataObject;
    } else {
      const splitData = data.split(".");
      const dataString = splitData.reduce((a, b) => a[b], props.coinData);
      coinInfo.data = dataString;

      coinInfo.addClass = splitData[Math.floor(splitData.length / 2)];
    }

    coinInfo.label = label;
    coinInfo.type = type;
    coinInfo.separator = separator;

    dataArr.push(coinInfo);
  };

  const { coinData } = props;
  const { symbol } = coinData;

  const bottomInfoData = [
    {
      data: ["market_data.current_price.usd"],
      label: `${symbol.toUpperCase()} Price`,
      type: [typeMoney],
    },
    {
      data: ["market_data.high_24h.usd", "market_data.low_24h.usd"],
      label: "24h High / 24h Low",
      type: [typeMoney, typeMoney],
      separator: ["/"],
    },
    {
      data: [
        "market_data.ath.usd",
        "market_data.ath_change_percentage.usd",
        "market_data.ath_date.usd",
      ],
      label: "All-Time High",
      type: [typeMoney, typePercent, typeDate],
    },
    {
      data: [
        "market_data.atl.usd",
        "market_data.atl_change_percentage.usd",
        "market_data.atl_date.usd",
      ],
      label: "All-Time Low",
      type: [typeMoney, typePercent, typeDate],
    },
  ];

  useEffect(() => {
    (async function () {
      if (props.coinData) {
        bottomInfoData.map((data) => constructData(data));
        setCoinDataTable(dataArr);
      }
    })();
  }, [props.coinData]);

  console.log(props.coinData);
  return (
    <div className="bottomInfo">
      {coinDataTable && (
        <div className="container">
          <div className="title">Bitcoin Price and Market Stats</div>
          {coinDataTable.map((row) => renderCoinInfo(row))}
        </div>
      )}
    </div>
  );
}
