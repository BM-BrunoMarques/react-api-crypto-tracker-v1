import React, { useContext } from "react";
import { Table, Avatar } from "antd";
import { stateCoinsContext } from "../App";
import { formatPrice, formatPercentage } from "../../utils/helpers";
import { useHistory } from "react-router-dom";

import "./TableScroll.css";

export default function TableScroll() {
  const { stateCoinsC } = useContext(stateCoinsContext);
  const [stateValues, setStateValues] = stateCoinsC;
  const history = useHistory();

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
      render: (percent) => {
        return {
          children: (
            <span
              className={"percent ".concat(
                percent > 0 ? "positive" : "negative"
              )}
            >
              {formatPercentage(percent)}
            </span>
          ),
        };
      },
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h_in_currency",
      key: "price_change_percentage_24h_in_currency",
      width: 30,
      align: "center",
      render: (percent) => {
        return {
          children: (
            <span
              className={"percent ".concat(
                percent > 0 ? "positive" : "negative"
              )}
            >
              {formatPercentage(percent)}
            </span>
          ),
        };
      },
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d_in_currency",
      key: "price_change_percentage_7d_in_currency",
      width: 30,
      align: "center",
      render: (percent) => {
        return {
          children: (
            <span
              className={"percent ".concat(
                percent > 0 ? "positive" : "negative"
              )}
            >
              {formatPercentage(percent)}
            </span>
          ),
        };
      },
    },
  ];
  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            history.push(`/coin/${record.id}`);
          }, // click row
          // onDoubleClick: (event) => {}, // double click row
          // onContextMenu: (event) => {}, // right button click row
          // onMouseEnter: (event) => {}, // mouse enter row
          // onMouseLeave: (event) => {}, // mouse leave row
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
