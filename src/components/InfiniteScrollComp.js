import "../App.css";
import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';

class InfiniteScrollComp extends Component {
  
  render() {
    const {items, moreItems, fetchData} = this.props;

    return (
      <InfiniteScroll
        loadMore={fetchData}
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

export default InfiniteScrollComp;
