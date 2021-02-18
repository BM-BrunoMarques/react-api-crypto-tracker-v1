import "../../App.css";
import "./Coin.css";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "../App";
import { Spinner } from "../loadingSpinner/Spinner";
import { Avatar, Row, Col } from "antd";
import { getSelectedCoinData } from "../../utils/api";
import parse from "html-react-parser";
import TagLinks from "./TagLinks";
import CoinChart from "./CoinChart";

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
      {coinData && (
        <div>
          {isLoading.load && <Spinner tip={isLoading.tip} />}
          <div>
            <button onClick={handleClick}>back to Coins</button>

            <div>
              <Row align="start" style={{ padding: "15px" }}>
                <Col span={24}>
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
                        {coinData.name}{" "}
                        <i>({coinData.symbol?.toUpperCase()})</i>
                      </h2>
                    </div>
                  </Col>
                  <Col span={12}>
                    {
                      // Right side
                      // current price is = .current_price.usd
                      // .price_change_percentage_24h_in_currency.usd
                    }
                  </Col>
                </Col>
                <Col span={24}>
                  <Col span={12}>
                    <div className="tagsContainer">
                      <TagLinks coinData={coinData}/>
                    </div>
                  </Col>
                  <Col span={12}>
                    info
                    {
                      // market_data: (.market_data)
                      // Market Cap = .market_cap.usd
                      // $977,600,515,590
                      // 24 Hour Trading Vol =  .total_volume
                      // $68,907,457,854
                      // 24h Low / 24h High = .high_24h / .low_24h
                      // $49,029.70 / $52,547.80
                      // Circulating Supply = .circulating_supply / .max_supply
                      // 18,631,568 / 21,000,000
                      // Fully Diluted Valuation = .fully_diluted_valuation
                      // $1,101,872,415,000
                      // Max Supply = .max_supply
                      // 21,000,000
                    }
                  </Col>
                </Col>
                <Col span={24}>
                  <Col span={14}>
                    <CoinChart />
                  </Col>
                  <Col span={10}>table
                  {/* TABLE
                  BTC Price	$52,170.13
                      Market Cap	$972,022,418,270
                      Market Cap Dominance	60.02%
                      Trading Volume	$67,427,596,400
                      Volume / Market Cap	0.0694
                      24h Low / 24h High	$49,364.64 / $52,547.80
                      7d Low / 7d High	$46,941.29 / $52,143.68
                      Market Cap Rank	#1
                      All-Time High	$52,547.80 -0.7%
                      Feb 17, 2021 (about 8 hours)
                      All-Time Low	$67.81 76815.4%
                  */}
                  </Col>
                </Col>

                <Col xs={{ span: 24, offset: 0 }} xl={{ span: 10, offset: 0 }}>
                  {parse(`${coinData.description?.en}`)}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
