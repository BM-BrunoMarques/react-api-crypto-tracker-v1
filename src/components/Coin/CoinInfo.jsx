import React from "react";
import { Row, Col } from "antd";
import {
  formatPrice,
  formatPercentage,
  formatNumber,
  renderInfo
} from "../../utils/helpers";

export default function CoinDataTable(props) {
  const { coinData } = props;
  const typeMoney = formatPrice;
  const typePercent = formatPercentage;
  const typeNumber = formatNumber;
  return (
    <Row className="coinTableContainer">
      <Col
        className="topRightInfo"
        sm={{ span: 22, offset: 2 }}
        xs={{ span: 12 }}
      >
        {renderInfo(
          coinData.market_data.market_cap.usd,
          "Market Cap",
          typeMoney
        )}
        {renderInfo(
          [coinData.market_data.low_24h.usd, coinData.market_data.high_24h.usd],
          "24h Low / 24h High",
          typeMoney
        )}
        {renderInfo(
          coinData.market_data.fully_diluted_valuation.usd,
          "Fully Diluted Valuation",
          typeMoney
        )}
      </Col>
      <Col
        className="topRightInfo"
        sm={{ span: 22, offset: 2 }}
        xs={{ span: 12 }}
      >
        {renderInfo(coinData.total_volume, "24 Hour Trading Vol", typeMoney)}
        {renderInfo(
          [
            coinData.market_data.circulating_supply,
            coinData.market_data.max_supply,
          ],
          "Circulating Supply",
          typeNumber
        )}
        {renderInfo(
          coinData.market_data.total_volume.usd,
          "24 Hour Trading Vol",
          typeMoney
        )}
      </Col>
    </Row>
  );
}
