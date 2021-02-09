import { Card, Avatar } from "antd";

export const CurrencyCard = ({ coins }) => (
  <div>
    {coins.map((coin, indx) => (
      <Card
        key={coin.id.concat(indx)}
        style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}
      >
        <Avatar src={coin.image} />
        <span>{coin.name}</span>
      </Card>
    ))}
  </div>
);
