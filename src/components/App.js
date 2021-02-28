import "../App.css";
import React, { useState, useRef, createContext } from "react";
import Coin from "./Coin/Coin";
import CoinsHomeListing from "./CoinsHomeListing";
import SearchBar from "./SearchBar";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";
const { Header, Content, Footer } = Layout;

export const stateCoinsContext = createContext();

function App() {
  const scrollParentRef = useRef(null);

  const [stateValues, setStateValues] = useState({
    coins: [],
    page: 1,
    isLoading: false,
  });

  const [isLoading, setLoading] = useState({
    load: true,
    tip: "",
  });

  const [selectedCoin, setSelectedCoin] = useState("");
  const [moreItems, setMoreItems] = useState(true);
  const [numOfPages, setnumOfPages] = useState();
  const [searchText, setSearchText] = useState("");
  const [scrollPosition, setScrollPosition] = useState("");
  const [fetchDataFunction, setFetchData] = useState(null);

  const coinsStoreContext = {
    selectedCoinC: [selectedCoin, setSelectedCoin],
    moreItemsC: [moreItems, setMoreItems],
    numOfPagesC: [numOfPages, setnumOfPages],
    stateCoinsC: [stateValues, setStateValues],
    isLoadingC: [isLoading, setLoading],
    searchTextC: [searchText, setSearchText],
    scrollPositionC: [scrollPosition, setScrollPosition],
    fetchDataFunctionC: [fetchDataFunction, setFetchData],
    scrollParentRefC: scrollParentRef,
  };

  return (
    <Layout style={{ height: "100%" }}>
      <stateCoinsContext.Provider value={coinsStoreContext}>
        <BrowserRouter>
          <Header>
            <Row style={{ height: "100%" }} align="start">
              <Col style={{ height: "100%" }} span={24}>
                <SearchBar
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                />
              </Col>
            </Row>
          </Header>
          <Content>
            <Row style={{ height: "100%" }} align="middle">
              <Col
                className="mainContent"
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }}
                xl={{ span: 18, offset: 3 }}
                xxl={{ span: 15, offset: 5 }}
              >
                <Route path="/" component={CoinsHomeListing} />
                <Route path="/coin" component={Coin} />
              </Col>
            </Row>
          </Content>
          <Footer>Bruno Website / GITHUB</Footer>
        </BrowserRouter>
      </stateCoinsContext.Provider>
    </Layout>
  );
}

export default App;
