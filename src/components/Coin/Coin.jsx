import "../../App.css";
import "./Coin.css";
import React, { useEffect, useContext, useState } from "react";
import { Line } from "@ant-design/charts";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "../App";
import { Spinner } from "../loadingSpinner/Spinner";
import { getSelectedCoin } from "../../utils/api";
import { formatPrice } from "../../utils/helpers";
import { Avatar, Row, Col } from "antd";
import { getSelectedCoinData } from "../../utils/api";
import parse from "html-react-parser";

export default function Coin(props) {
  const {
    selectedCoinC,
    isLoadingC,
    searchTextC,
    scrollPositionC,
  } = useContext(stateCoinsContext);

  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [isLoading, setLoading] = isLoadingC;
  const [searchText, setSearchText] = searchTextC;
  const [scrollPosition, setScrollPosition] = scrollPositionC;

  const [coinChartData, setChartData] = useState([]);
  const [coinData, setcoinData] = useState({});

  const history = useHistory();

  const { coinId } = props.history.location;

  var config = {
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

  let urlSlice = "";

  useEffect(async () => {
    urlSlice = props.location.pathname.split("/").pop();
    if (!selectedCoin || selectedCoin !== urlSlice) {
      if (urlSlice !== "/coin") {
        setSelectedCoin(urlSlice);
        setScrollPosition(urlSlice);
      } else if (!coinId) {
        setSelectedCoin(coinId);
        setScrollPosition(coinId);
      } else {
        history.push("/");
        setSelectedCoin("");
      }
    }
  }, []);

  useEffect(async () => {
    if (selectedCoin) {
      const coinData = await getSelectedCoinData(selectedCoin);
      setcoinData(coinData);
      const coinChartInfo = await getSelectedCoin(selectedCoin);
      setChartData(coinChartInfo);
    }
  }, [selectedCoin]);

  const handleClick = () => {
    setLoading({
      load: true,
      tip: `Taking you back...`,
    });
    //CHANGE
    setTimeout(() => {
      history.push("/");
      setSearchText("");
      setSelectedCoin("");
    }, 10);
    //
  };

  console.log(coinData);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        maxHeight: "70vh",
        top: "0",
        left: "0",
        position: "absolute",
        zIndex: "3",
        overflowY: "scroll",
      }}
    >
      {selectedCoin && coinData && (
        <div>
          {isLoading.load && <Spinner tip={isLoading.tip} />}
          <div>
            <button onClick={handleClick}>back to Coins</button>
            {coinChartData && (
              <div>
                <Row align="space-around" style={{ padding: "15px" }}>
                  <Col span={12}>
                    <div className="header">
                      <Avatar
                        size={{
                          xs: 40,
                          sm: 40,
                          md: 40,
                          lg: 64,
                          xl: 80,
                          xxl: 80,
                        }}
                        src={coinData.image?.large}
                      />

                      <h2 className="titleCoin">
                        {coinData.name} <i>({coinData.symbol?.toUpperCase()})</i>
                      </h2>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    xl={{ span: 11, offset: 0 }}
                  >
                    <Line
                      data={coinChartData}
                      {...config}
                      style={{ maxHeight: "300px", padding: "15px 10px" }}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    xl={{ span: 10, offset: 0 }}
                  >
                    {parse(`${coinData.description?.en}`)}
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
