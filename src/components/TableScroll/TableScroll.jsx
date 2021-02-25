import React, { useContext, useEffect } from "react";
import { Table, Avatar } from "antd";
import { TinyLine } from "@ant-design/charts";
import { stateCoinsContext } from "../App";
import { formatPrice, formatPercentage } from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import { StickyTable, Row, Cell } from "react-sticky-table";
import LazyLoad, { forceVisible, forceCheck } from "react-lazyload";

import "./TableScroll.css";

export default function TableScroll(props) {
  const { stateCoinsC, isLoadingC, fetchDataFunctionC } = useContext(
    stateCoinsContext
  );

  const [fetchDataFunction] = fetchDataFunctionC;
  const [stateValues] = stateCoinsC;
  const [isLoading, setLoading] = isLoadingC;
  const history = useHistory();

  useEffect(() => {
    forceCheck();
    forceVisible();
    setLoading({
      load: false,
    });
  }, []);

  const config = {
    height: 60,
    width: 80,
    autoFit: false,
    smooth: false,
    passive: false,

    lineStyle: {
      stroke: "blue",
      lineWidth: 1,
      lineDash: [1, 1],
      strokeOpacity: 0.7,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    },
    tooltip: {
      formatter: (data) => {
        return data.y;
      },
    },
  };

  const columns = {
    coin: {
      title: "Coin",
      key: ["image", "name"],
      render: (record) => {
        const id = "coin";
        const key = columns[id].key;
        return (
          <div style={{ display: "flex", maxWidth: "130px" }}>
            <Avatar size="normal" src={record[key[0]]} />
            <span className="title">{record[key[1]]}</span>
            <div
              style={{ position: " absolute", top: "-35px" }}
              id={record.id}
            ></div>
          </div>
        );
      },
    },
    symbol: {
      title: "",
      key: "symbol",
      render: (record) => {
        const id = "symbol";
        const key = columns[id].key;
        return (
          <span style={{ maxWidth: "80px", display: "inline-block" }}>
            {record[key].toUpperCase()}
          </span>
        );
      },
    },
    current_price: {
      title: "Price",
      key: "current_price",
      render: (record) => {
        const id = "current_price";
        const key = columns[id].key;
        return <span>{formatPrice(record[key])}</span>;
      },
    },
    price_change_percentage_1h_in_currency: {
      title: "1h",
      key: "price_change_percentage_1h_in_currency",
      render: (record) => {
        const id = "price_change_percentage_1h_in_currency";
        const key = columns[id].key;
        return (
          <span
            className={`percent ${record[key] > 0 ? "positive" : "negative"}`}
          >
            {formatPercentage(record[key])}
          </span>
        );
      },
    },
    price_change_percentage_24h_in_currency: {
      title: "24h",
      key: "price_change_percentage_24h_in_currency",
      render: (record) => {
        const id = "price_change_percentage_24h_in_currency";
        const key = columns[id].key;
        return (
          <span
            className={`percent ${record[key] > 0 ? "positive" : "negative"}`}
          >
            {formatPercentage(record[key])}
          </span>
        );
      },
    },
    price_change_percentage_7d_in_currency: {
      title: "7d",
      key: "price_change_percentage_7d_in_currency",
      render: (record) => {
        const id = "price_change_percentage_7d_in_currency";
        const key = columns[id].key;
        return (
          <span
            className={`percent ${record[key] > 0 ? "positive" : "negative"}`}
          >
            {formatPercentage(record[key])}
          </span>
        );
      },
    },
    sparkline_in_7d: {
      title: "Last 7 Days",
      key: "sparkline_in_7d",
      render: (record) => {
        const id = "sparkline_in_7d";
        const key = columns[id].key;
        return <TinyLine data={record[key].price} {...config} />;
      },
    },

    // {
    //   title: "Last 7 Days",
    //   dataIndex: "sparkline_in_7d",
    //   key: "sparkline_in_7d",
    //   align: "center",
    //   width: 100,
    //   height: 60,
    //   render: ({ price }) => {
    //     // const dataMod = price.map((price) => price.toFixed(4));
    //     // <MiniChart dataSet={price}/>
    //
    //     // const sparklinePrices = sparkline.price.map((price, indx) => ({
    //     //   day: Math.round(indx * 100 / sparkline.price.length),
    //     //   value: Math.ceil(price),
    //     // }));
    //     // return <Line data={sparklinePrices} {...config} />;
    //   },
    // },
  };

  console.log("FETCH DATA IS :", fetchDataFunction);
  const renderHeader = (data, ind) => (
    <Row className="sticky-table-row">
      {Object.values(columns).map((column, ind) => (
        <Cell className="stickyBG" id={`${column.title}${ind}`}>
          {column.title}
        </Cell>
      ))}
    </Row>
  );

  const renderRows = (data, ind) => (
    <Row
      className="coinRow"
      style={{ zIndex: "3", display: "contents" }}
      key={`${data.id}${ind}`}
      onClick={() => {
        setLoading({
          load: true,
          tip: `Loading Coin!`,
        });
        //timeout
        history.push(`/coin/${data.id}`);
      }}
    >
      <LazyLoad
        overflow
        height={50}
        className="coinRow"
        style={{ display: "table-row" }}
        once
      >
        <Cell className="stickyBG" style={{ zIndex: "2" }}>
          {columns.coin.render(data)}
        </Cell>

        <Cell>{columns.symbol.render(data)}</Cell>
        <Cell>{columns.current_price.render(data)}</Cell>
        <Cell>
          {columns.price_change_percentage_1h_in_currency.render(data)}
        </Cell>
        <Cell>
          {columns.price_change_percentage_24h_in_currency.render(data)}
        </Cell>
        <Cell>
          {columns.price_change_percentage_7d_in_currency.render(data)}
        </Cell>
        <Cell>{columns.sparkline_in_7d.render(data)}</Cell>
      </LazyLoad>
    </Row>
  );

  const onScroll = (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.offsetHeight) {
      fetchDataFunction();
    }
  };

  return (
    <div>
      {stateValues.coins && (
        // <AntdRow>
        <div className="wrapper overflow-wrapper">
          <StickyTable
            className="overflow CoinsListingContainer"
            onScroll={onScroll}
          >
            {renderHeader()}
            {stateValues.coins.map((data, ind) => renderRows(data, ind))}
          </StickyTable>
        </div>
        // </AntdRow>
      )}
      {/* <Table
        onRow={(record) => {
          return {
            , // click row
          };
        }}
        pagination={false}
        columns={columns}
        dataSource={stateValues.coins}
        rowKey={(record, indx) => `${record.id}${indx}`}
        sticky={true}
        scroll={{ x: "max-content" }}
      /> */}
    </div>
  );
}
