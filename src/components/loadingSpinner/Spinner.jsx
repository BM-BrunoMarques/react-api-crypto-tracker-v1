import { Spin } from "antd";
import "./Spinner.css";

export function Spinner(props) {
  const { tip } = props;
  return (
    <div className="loadingContainer">
      <div className="backgroundBlur"></div>
      <Spin tip={tip} size="large" />
    </div>
  );
}
