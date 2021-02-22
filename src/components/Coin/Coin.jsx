import "../../App.css";
import "./Coin.css";
import { formatPrice, formatPercentage } from "../../utils/helpers";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "../App";
import { Spinner } from "../loadingSpinner/Spinner";
import { Avatar, Row, Col } from "antd";
import { getSelectedCoinData } from "../../utils/api";
import parse from "html-react-parser";
import TagLinks from "./TagLinks";
import CoinChart from "./CoinChart";
import CoinInfo from "./CoinInfo";
import CoinDataTable from "./CoinDataTable";

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

  const [coinData, setcoinData] = useState();
  const history = useHistory();

  const { coinId } = props.history.location;

  const avatarSize = {
    xs: 40,
    sm: 40,
    md: 40,
    lg: 64,
    xl: 80,
    xxl: 80,
  };

  let urlSlice = "";
  useEffect(() => {
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

  useEffect(() => {
    if (selectedCoin) {
      (async function () {
        const coinData = await getSelectedCoinData(selectedCoin);
        setcoinData(coinData);
      })();
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

  return (
    <Col className="coinStage" span={24}>
      {coinData && (
        <Row>
          {isLoading.load && <Spinner tip={isLoading.tip} />}

          <button onClick={handleClick}>back to Coins</button>

          <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }}>
            <Row className="header" justify="start">
              <Col span={14}>
                <div className="headerLeft">
                  <Avatar size={avatarSize} src={coinData.image?.large} />

                  <h2 className="titleCoin">
                    {coinData.name} <i>({coinData.symbol?.toUpperCase()})</i>
                  </h2>
                </div>
              </Col>
              <Col span={9} offset={1}>
                <div className="headerRight">
                  <span className="currentPrice">
                    {formatPrice(coinData.market_data.current_price.usd)}
                  </span>
                  <span
                    className={`percent ${
                      coinData.market_data.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {formatPercentage(
                      coinData.market_data.price_change_percentage_24h
                    )}
                  </span>
                </div>
              </Col>
            </Row>

            <Col md={{ span: 24 }}>
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col className="leftSide" xs={{ span: 24 }} sm={{ span: 13 }}>
                  <TagLinks coinData={coinData} />
                </Col>

                <Col
                  className="rightSide"
                  xs={{ span: 24 }}
                  sm={{ span: 8, offset: 2 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoinInfo coinData={coinData} />
                </Col>
              </Row>
              <Row justify="start">
                <Col span={24}>
                  <Row>
                    <Col
                      xs={{ span: 22, offset: 1 }}
                      sm={{ span: 23, offset: 1 }}
                      md={{ span: 14, offset: 0 }}
                    >
                      <CoinChart />
                    </Col>
                    <Col
                      xs={{ span: 22, offset: 2 }}
                      sm={{ span: 17, offset: 2 }}
                      md={{ span: 9, offset: 1 }}
                    >
                      <CoinDataTable coinData={coinData} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xs={{ span: 24, offset: 0 }} xl={{ span: 10, offset: 0 }}>
              {parse(`${coinData.description?.en}`)}
            </Col>
          </Col>
        </Row>
      )}
    </Col>
  );
}
