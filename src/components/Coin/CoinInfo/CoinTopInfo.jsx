import React from "react";
import { Row, Col } from "antd";
import { formatPrice, formatNumber } from "../../../utils/helpers";
import { renderCoinInfo } from "./renderCoinInfo";

export default function CoinTopInfo(props) {
  const { coinData } = props;
  const typeMoney = formatPrice;
  const typeNumber = formatNumber;

  const coinInfoData = {
    topCol: [
      {
        data: [coinData.market_data.market_cap.usd],
        label: "Market Cap",
        type: [typeMoney],
      },
      {
        data: [
          coinData.market_data.low_24h.usd,
          coinData.market_data.high_24h.usd,
        ],
        label: "24h Low / 24h High",
        type: [typeMoney, typeMoney],
        separator: ["/"],
      },
      {
        data: [coinData.market_data.fully_diluted_valuation.usd],
        label: "Fully Diluted Valuation",
        type: [typeMoney],
      },
    ],
    bottomCol: [
      {
        data: [coinData.total_volume],
        label: "24 Hour Trading Vol",
        type: [typeMoney],
      },
      {
        data: [
          coinData.market_data.circulating_supply,
          coinData.market_data.max_supply,
        ],
        label: "Circulating Supply",
        type: [typeNumber, typeNumber],
        separator: ["/"],
      },
      {
        data: [coinData.market_data.total_volume.usd],
        label: "24 Hour Trading Vol",
        type: [typeMoney],
      },
    ],
  };

  return (
    <Row className="coinTableContainer">
      <Col
        className="topRightInfo"
        sm={{ span: 22, offset: 2 }}
        xs={{ span: 12 }}
      >
        {coinInfoData.topCol.map((el) => el.data[0] && renderCoinInfo(el))}
      </Col>
      <Col
        className="topRightInfo"
        sm={{ span: 22, offset: 2 }}
        xs={{ span: 12 }}
      >
        {coinInfoData.bottomCol.map((el) => el.data[0] && renderCoinInfo(el))}
      </Col>
    </Row>
  );
}
