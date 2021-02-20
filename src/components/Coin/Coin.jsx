import "../../App.css";
import "./Coin.css";
import React, { useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { stateCoinsContext } from "../App";
import { Spinner } from "../loadingSpinner/Spinner";
import { Avatar, Row, Col } from "antd";
import { getSelectedCoinData } from "../../utils/api";
import parse from "html-react-parser";
import TagLinks from "./TagLinks";
import CoinChart from "./CoinChart";
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

  const [tagsHeight, setTagsHeight] = useState(0);
  const [coinData, setcoinData] = useState();
  const history = useHistory();
  const tagsDivRef = useRef(null);

  const { coinId } = props.history.location;

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

  const setTagsDivHeight = () => {
    setTagsHeight(tagsDivRef.current.scrollHeight);
  };
  console.log(coinData);
  return (
    <Col
      span={24}
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
        <Row>
          {isLoading.load && <Spinner tip={isLoading.tip} />}

          <button onClick={handleClick}>back to Coins</button>

          {/* <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 18, offset: 3 }}
            xl={{ span: 18, offset: 3 }}
            style={{ height: "100%", maxHeight: "70vh" }}
          ></Col> */}
          <Col span={24}>
            <Row justify="start">
              <Col className="header" span={12}>
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
              </Col>
              <Col span={10} offset={2}>
                <p>current price</p>
                <p>price change percent</p>
              </Col>
            </Row>
          </Col>
          <Col span={22} offset={1}>
            <Row justify="start">
              <Col xs={{ span: 24 }} sm={{ span: 13 }}>
                <div
                  className="tagsContainer"
                  style={{ height: "fit-content" }}
                  ref={tagsDivRef}
                >
                  <TagLinks coinData={coinData} setHeight={setTagsDivHeight} />
                </div>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 10, offset: 1}}>
                <CoinDataTable coinData={coinData} tagsHeight={tagsHeight} />
              </Col>

              <Col  xs={{ span: 24 }} sm={{ span: 12}}>
                <CoinChart />
              </Col>
            </Row>
          </Col>
          <Col span={22} offset={1}>
            <Col span={10}></Col>
          </Col>

          <Col xs={{ span: 24, offset: 0 }} xl={{ span: 10, offset: 0 }}>
            {parse(`${coinData.description?.en}`)}
          </Col>
        </Row>
      )}
    </Col>
  );
}
