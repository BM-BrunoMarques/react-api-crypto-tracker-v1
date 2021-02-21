import React from "react";
import { Row, Col } from "antd";
import {
  formatPrice,
  formatPercentage,
  formatNumber,
} from "../../utils/helpers";

export default function Coin(props) {
  const { coinData } = props;

  {
    /* TABLE
                  BTC Price	$52,170.13
                      Market Cap	$972,022,418,270
                      Market Cap Dominance	60.02%
                      Trading Volume	$67,427,596,400
                      Volume / Market Cap	0.0694
                      24h Low / 24h High	$49,364.64 / $52,547.80
                      7d Low / 7d High	$46,941.29 / $52,143.68
                      All-Time High	$52,547.80 -0.7%
                      Feb 17, 2021 (about 8 hours)
                      All-Time Low	$67.81 76815.4%
                  */
  }

  const typeMoney = formatPrice;
  const typePercent = formatPercentage;
  const typeNumber = formatNumber;

  const renderInfo = (data, label, convertData) => {
    if (
      (typeof data === "object" && !Number(data[0])) ||
      (typeof data !== "object" && !Number(data))
    ) {
      return;
    }

    return (
      <div className="tagRow">
        <div className="tagLegend">{label}</div>
        {typeof data === "object" ? (
          <div className="info">
            {convertData(data[0])} / {convertData(data[1])}
          </div>
        ) : (
          <div className="info">{convertData(data)}</div>
        )}
      </div>
    );
  };

  return (
    <Row className="coinTableContainer">
      <Col sm={{ span: 24 }} xs={{ span: 12 }}>
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
      <Col sm={{ span: 24 }} xs={{ span: 12 }}>
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
