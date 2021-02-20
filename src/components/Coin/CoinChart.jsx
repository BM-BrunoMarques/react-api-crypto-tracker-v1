import "../../App.css";
import "./Coin.css";
import React, { useState, useContext, useEffect } from "react";
import { stateCoinsContext } from "../App";
import { Line } from "@ant-design/charts";
import { getSelectedCoin } from "../../utils/api";
import { formatPrice } from "../../utils/helpers";

export default function CoinChart(props) {
  const { selectedCoinC } = useContext(stateCoinsContext);

  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [coinChartData, setChartData] = useState([]);

  useEffect(async () => {
    if (selectedCoin) {
      const coinChartInfo = await getSelectedCoin(selectedCoin);
      setChartData(coinChartInfo);
    }
  }, [selectedCoin]);

  const config = {
    renderer: "canvas",
    autoFit: true,
    xField: "date",
    yField: "price",
    label: false,
    tooltip: { showMarkers: false },
    lineStyle: {
      stroke: "orange",
      lineWidth: 1,
      lineDash: [1, 1],
      strokeOpacity: 1,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    },
    meta: {
      price: {
        formatter: (price) => {
          return formatPrice(price);
        },
      },
    },
  };

  return (
    <Line
      data={coinChartData}
      {...config}
      style={{ padding: "15px 0", maxHeight: '300px', marginTop: '20px' }}
    />
  );
}
