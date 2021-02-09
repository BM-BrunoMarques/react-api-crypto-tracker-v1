import { Spin } from "antd";
import "./Spinner.css";

export const Spinner = () => (
  <div className="loadingContainer">
    <div className="backgroundBlur"></div>
    <Spin tip="Fetching more Coins..." size="large" />
  </div>
);
