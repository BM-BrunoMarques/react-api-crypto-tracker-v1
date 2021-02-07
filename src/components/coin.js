import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Coin(props) {
  // Hooks from props
  // console.log(props);
  // const [selectedCoin, setSelectedCoin] = useState(props.selectCoinHook);
  // useEffect(() => {
  //   setSelectedCoin(props.selectedCoin);
  // }, [props.selectedCoin]);

  return (
    <div>
      <Link
        to={{
          pathname: "/",
          state: {
            goBack: true
          },
        }}
      >
        {props.location.state.coinName}
      </Link>
    </div>
  );
}

export default Coin;
