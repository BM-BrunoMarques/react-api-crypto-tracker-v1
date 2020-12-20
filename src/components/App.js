import "../App.css";
import React, { Component } from "react";
import { getCoins } from "../utils/api.js";
import InfiniteScroll from "react-infinite-scroll-component";

class App extends Component {
  state = {
    items: [],
    moreItems: true,
    page: 1,
  };

  async componentDidMount() {
    console.log("inAPP : ", this.state.page);
    this.setState({
      items: await getCoins(this.state.page),
      page: this.state.page + 1,
    });
  }

  // componenentDidUpdate(prevState) {
  //   if (this.state.items === prevState.items) {
  //     this.setState({
  //       moreItems: false,
  //     });
  //   }
  // }

  fetchData = () => {
    setTimeout(async () => {
      this.setState({
        items: this.state.items.concat(await getCoins(this.state.page)),
        page: this.state.page + 1,
      });
    }, 200);
  };

  render() {
    const { items, moreItems } = this.state;
    // console.log(itemKey);

    return (
      <InfiniteScroll
        dataLength={typeof items !== "undefined" ? items.length : 250}
        next={this.fetchData}
        hasMore={moreItems}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all...</b>
          </p>
        }
      >
        {items.map((item, index) => (
          <div key={item.id.concat(index)}> {item.id} </div>
        ))}
      </InfiniteScroll>
    );
  }
}

export default App;
