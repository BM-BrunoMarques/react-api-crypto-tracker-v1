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
import TagLinks from "./TagLinks/TagLinks";
import CoinChart from "./CoinChart/CoinChart";
import CoinTopInfo from "./CoinInfo/CoinTopInfo";
import CoinBottomInfo from "./CoinInfo/CoinBottomInfo";

export default function Coin(props) {
  const { selectedCoinC, isLoadingC, scrollPositionC } = useContext(
    stateCoinsContext
  );

  const [selectedCoin, setSelectedCoin] = selectedCoinC;
  const [isLoading, setLoading] = isLoadingC;
  const [, setScrollPosition] = scrollPositionC;

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
        setLoading(false);
      })();
    }
  }, [selectedCoin]);

  console.log("COINDATA :  ", coinData);
  return (
    <Col className="coinStage" span={24}>
      <div className="coinWrap">
        {coinData && (
          <Row>
            {isLoading.load && <Spinner tip={isLoading.tip} />}
            <Col
              xs={{ span: 24 }}
              sm={{ span: 22, offset: 1 }}
              md={{ span: 23, offset: 1 }}
            >
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

              <Col md={{ span: 22, offset: 1 }}>
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
                    <CoinTopInfo coinData={coinData} />
                  </Col>
                </Row>
                <Row style={{ marginTop: "40px" }} justify="start">
                  <Col span={24}>
                    <Row>
                      <Col
                        xs={{ span: 22, offset: 1 }}
                        sm={{ span: 23, offset: 1 }}
                        md={{ span: 13, offset: 0 }}
                      >
                        <CoinChart />
                      </Col>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 20, offset: 3 }}
                        md={{ span: 10, offset: 1 }}
                        lg={{ span: 8, offset: 3 }}
                      >
                        <CoinBottomInfo
                          coinData={coinData}
                          selectedCoin={selectedCoin}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {coinData.description.en && (
                <Row justify="center">
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    md={{ span: 22, offset: 1 }}
                    xl={{ span: 17, offset: 0 }}
                  >
                    <div className="description">
                      <div className="title">
                        <Avatar size={50} src={coinData.image?.large} />
                        {`About ${coinData.name}:`}
                      </div>
                      <div className="text">
                        <div className="textWrap">
                          {parse(`${coinData.description?.en}`)}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Col>
  );
}
