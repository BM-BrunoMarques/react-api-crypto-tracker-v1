import React from "react";
import { Row, Col } from "antd";
import { formatPrice, formatPercentage } from "../../utils/helpers";

export default function Coin(props) {
  const { coinData, tagsHeight } = props;
  {
    // Market Cap = .market_cap.usd
    // $977,600,515,590
    // 24h Low / 24h High = .high_24h / .low_24h
    // $49,029.70 / $52,547.80
    // Fully Diluted Valuation = .fully_diluted_valuation
    // $1,101,872,415,000
    //
    // 24 Hour Trading Vol =  .total_volume
    // $68,907,457,854
    // Circulating Supply = .circulating_supply / .max_supply
    // 18,631,568 / 21,000,000
    // Max Supply = .max_supply
    // 21,000,000
  }
  {
    /* TABLE
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
                  */
  }

  const typeMoney = formatPrice;
  const typePercent = formatPercentage;

  const renderInfo = (data, label, convertData) => {
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
    <Row className="coinTableContainer" style={{ height: tagsHeight }}>
      <Col sm={{ span: 24 }} xs={{ span: 12 }}>
        {renderInfo(
          coinData.market_data.market_cap.usd,
          "Market Cap",
          typeMoney
        )}
        {renderInfo(
          coinData.market_data.total_volume.usd,
          "Total Volume",
          typeMoney
        )}
        {renderInfo(
          [coinData.market_data.low_24h.usd, coinData.market_data.high_24h.usd],
          "24h Low / 24h High",
          typeMoney
        )}
      </Col>
      <Col sm={{ span: 24 }} xs={{ span: 12 }}>
        <p>info</p>
        <p>info</p>
        <p>info</p>
        <p>info</p>
        <p>info</p>
        <p>info</p>
      </Col>
    </Row>
  );
}
