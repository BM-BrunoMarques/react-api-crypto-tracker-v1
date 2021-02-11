import React, { useContext } from "react";
import { Table, Avatar, Title } from "antd";
import { stateCoinsContext } from "../App";
import "./TableScroll.css";

export default function TableScroll() {
  const { stateCoinsC } = useContext(stateCoinsContext);

  const [stateValues, setStateValues] = stateCoinsC;

  const columns = [
    {
      title: "Coin",
      dataIndex: ["image", "name"],
      key: "coin",
      fixed: "left",
      width: 65,
      render: (empty, record) => {
        return {
          children: (
            <div style={{ display: "flex" }}>
              <Avatar size="small" src={record.image} />
              <span className="title">{record.name}</span>
              <div
                style={{ position: " absolute", top: "-10px" }}
                id={record.id}
              ></div>
            </div>
          ),
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (data) => {
        return {
          children: <span>{data}</span>,
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (data) => {
        return {
          children: <span>{data}</span>,
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (data) => {
        return {
          children: <span>{data}</span>,
        };
      },
    },
  ];
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={stateValues.coins}
      rowKey="id"
      sticky={true}
      scroll={{ x: 900 }}
    />
  );
}
