import React, { useContext } from "react";
import { Table, Avatar } from "antd";
import { TinyLine } from "@ant-design/charts";
import { stateCoinsContext } from "../App";
import { formatPrice, formatPercentage } from "../../utils/helpers";
import { useHistory } from "react-router-dom";

import "./TableScroll.css";

export default function TableScroll() {
  const { stateCoinsC } = useContext(stateCoinsContext);
  const [stateValues] = stateCoinsC;
  const history = useHistory();

  const config = {
    height: 40,
    width: 100,
    autoFit: false,
    smooth: false,

    lineStyle: {
      stroke: "blue",
      lineWidth: 1,
      lineDash: [1, 1],
      strokeOpacity: 0.7,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: "pointer",
      tickMethod: "pow",
    },
  };

  const columns = [
    {
      title: "Coin",
      dataIndex: ["image", "name"],
      key: "coin",
      fixed: "left",
      width: 80,
      align: "center",
      render: (empty, record) => {
        return {
          children: (
            <div style={{ display: "flex" }}>
              <Avatar size="normal" src={record.image} />
              <span className="title">{record.name}</span>
              <div
                style={{ position: " absolute", top: "-35px" }}
                id={record.id}
              ></div>
            </div>
          ),
        };
      },
    },
    {
      dataIndex: "symbol",
      key: "symbol",
      width: 20,
      align: "center",
      render: (data) => {
        return {
          children: <span className="symbol">{data.toUpperCase()}</span>,
        };
      },
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      width: 80,
      align: "center",
      render: (price) => {
        return {
          children: <span>{formatPrice(price)}</span>,
        };
      },
    },
    {
      title: "1h",
      dataIndex: "price_change_percentage_1h_in_currency",
      key: "price_change_percentage_1h_in_currency",
      width: 30,
      align: "center",
      render: (percent) => (
        <span className={`percent ${percent > 0 ? "positive" : "negative"}`}>
          {formatPercentage(percent)}
        </span>
      ),
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h_in_currency",
      key: "price_change_percentage_24h_in_currency",
      width: 30,
      align: "center",
      render: (percent) => (
        <span className={`percent ${percent > 0 ? "positive" : "negative"}`}>
          {formatPercentage(percent)}
        </span>
      ),
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d_in_currency",
      key: "price_change_percentage_7d_in_currency",
      width: 30,
      align: "center",
      render: (percent) => (
        <span className={`percent ${percent > 0 ? "positive" : "negative"}`}>
          {formatPercentage(percent)}
        </span>
      ),
    },
    {
      title: "Last 7 Days",
      dataIndex: "sparkline_in_7d",
      key: "sparkline_in_7d",
      align: "center",
      width: 100,
      render: ({ price }) => {
        // const dataMod = sparkline.price.map((price) => price ** 2);

        return <TinyLine data={price} {...config} />;
        // const sparklinePrices = sparkline.price.map((price, indx) => ({
        //   day: Math.round(indx * 100 / sparkline.price.length),
        //   value: Math.ceil(price),
        // }));
        // return <Line data={sparklinePrices} {...config} />;
      },
    },
  ];
  return (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            history.push(`/coin/${record.id}`);
          }, // click row
        };
      }}
      pagination={false}
      columns={columns}
      dataSource={stateValues.coins}
      rowKey="id"
      sticky={true}
      scroll={{ x: "max-content" }}
    />
  );
}
