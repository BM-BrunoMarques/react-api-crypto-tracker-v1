import "../App.css";
import React, { Component } from "react";
import { getCoins } from "../utils/api.js";
import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {
  state = {
    items: [],
    moreItems: true,
    page: 0,
  };

  async componentDidMount() {
    console.log("inAPP : ", this.state.page);
    this.setState({
      items: await getCoins(this.state.page),
      page: this.state.page + 1,
    });
  }

  fetchData = () => {
    setTimeout(async () => {
      const aa = await getCoins(this.state.page)
      console.log('yoooni', aa.length)
      this.setState({
        moreItems: (await getCoins(this.state.page)).length !== 0 ? true : false,
        items: this.state.items.concat(await getCoins(this.state.page)),
        page: this.state.page + 1,
      });
    }, 900);
  };

  render() {
    const { items, moreItems } = this.state;

    return (
      <InfiniteScroll
        loadMore={this.fetchData}
        hasMore={moreItems}
        loader={<h4 key={0}>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div key={item.id.concat(index)}> {item.id} </div>
        ))
        }
        {!moreItems &&
         <p style={{ textAlign: "center" }}>
            <b>You have seen it all...</b>
          </p>
        }
      </InfiniteScroll>
    );
  }
}

export default App;