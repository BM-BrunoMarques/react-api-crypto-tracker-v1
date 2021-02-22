import "../../App.css";
import "./Coin.css";
import React, { useState, useContext, useEffect } from "react";
import { stateCoinsContext } from "../App";
import { Line } from "@ant-design/charts";
import { getSelectedCoin } from "../../utils/api";
import { formatPrice } from "../../utils/helpers";
import { interval } from "../../utils/const";

export default function CoinChart(props) {
  const { selectedCoinC } = useContext(stateCoinsContext);

  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [coinChartData, setChartData] = useState([]);
  const [lastInterval, setLastInterval] = useState();

  useEffect(() => {
    if (selectedCoin) {
      (async function () {
        const coinChartInfo = await getSelectedCoin(
          selectedCoin,
          interval.day.value
        );
        setChartData(coinChartInfo);
      })();
    }
  }, [selectedCoin]);

  const config = {
    renderer: "canvas",
    autoFit: true,
    xField: "date",
    yField: "price",
    label: false,
    tooltip: { showMarkers: true },
    lineStyle: {
      stroke: "orange",
      lineWidth: 2,
      lineDash: [1, 2],
      strokeOpacity: 1,
      shadowColor: "orange",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    },
    smooth: true,


    meta: {
      price: {
        formatter: (price) => {
          return formatPrice(price);
        },
      },
    },
  };

  const changeInterval = (e) => {
    if (lastInterval === e.target.value) {
      return;
    }
    const chartInterval = +e.target.value
      ? +e.target.value
      : interval.max.value;

    (async function () {
      const coinChartInfo = await getSelectedCoin(selectedCoin, chartInterval);
      setChartData(coinChartInfo);
      setLastInterval(e.target.value);
    })();
  };

  const renderButtons = () =>
    Object.values(interval).map((obj) => (
      <button value={obj.value} onClick={(e) => changeInterval(e)}>
        {obj.label}
      </button>
    ));

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="navigation">{renderButtons()}</div>
      <Line data={coinChartData} {...config} style={{ marginTop: "15px" }} />
    </div>
  );
}
