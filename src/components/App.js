import "../App.css";
import React, { useState, useEffect, useRef, createContext } from "react";
import Coin from "./Coin";
import Home from "./Home";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;
export const stateCoinsContext = createContext();

function App() {
  const scrollParentRef = useRef(null);

  const [stateValues, setStateValues] = useState({
    coins: [],
    page: 1,
    isLoading: false,
  });
  const [page, setPage] = useState(1);

  const [selectedCoin, setSelectedCoin] = useState("");
  const [moreItems, setMoreItems] = useState(true);
  const [numOfPages, setnumOfPages] = useState();
  const [isLoading, setLoading] = useState(false);

  // const store = {
  //   sharing: [sharing, setSharing],
  //   help: [help, setHelp],
  //   pairing: [pairing, setPairing],
  // };
  const coinsStoreContext = {
    selectedCoinC: [selectedCoin, setSelectedCoin],
    moreItemsC: [moreItems, setMoreItems],
    numOfPagesC: [numOfPages, setnumOfPages],
    stateCoinsC: [stateValues, setStateValues],
    isLoadingC: [isLoading, setLoading],
    scrollParentRefC: scrollParentRef,
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <BrowserRouter>
          <Row style={{ height: "100%" }} align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 12, offset: 6 }}
              xl={{ span: 10, offset: 8 }}
            >
              <stateCoinsContext.Provider value={coinsStoreContext}>
                <SearchBar
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                />
                <div
                  ref={scrollParentRef}
                  style={{
                    maxHeight: "750px",
                    overflowY: "scroll",
                  }}
                >
                  <Route path="/" exact component={InfiniteScrollComp} />
                </div>
                <Route path="/coin" component={Coin} />
              </stateCoinsContext.Provider>
            </Col>
          </Row>
        </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;
