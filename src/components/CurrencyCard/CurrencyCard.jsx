import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";

export const CurrencyCard = ({ coins }) => (
  <div>
    {coins.map((coin, indx) => (
      <Link
        key={coin.id.concat(indx)}
        to={{
          pathname: "/coin/" + coin.id,
        }}
      >
        <Card
          id={coin.id}
          style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}
        >
          <Avatar src={coin.image} />
          <span>{coin.name}</span>
        </Card>
      </Link>
    ))}
  </div>
);
