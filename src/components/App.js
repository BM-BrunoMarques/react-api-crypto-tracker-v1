import "../App.css";
import React, { useState, useRef, createContext } from "react";

import Coin from "./Coin";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

import { BrowserRouter, Route } from "react-router-dom";
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
  // const [page, setPage] = useState(1);

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

  console.log(stateValues.coins);
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <BrowserRouter>
          <Row style={{ height: "100%" }} align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 18, offset: 3 }}
              xl={{ span: 18, offset: 3 }}
            >
              <stateCoinsContext.Provider value={coinsStoreContext}>
                <SearchBar
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                />
                <div
                  ref={scrollParentRef}
                  style={{
                    minHeight:"500px",
                    maxHeight: "70vh",
                    overflowY: "scroll",
                  }}
                >
                  <Route path="/" exact component={InfiniteScrollComp} />
                  {/* <Route path="/" exact component={TableScroll} /> */}
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
