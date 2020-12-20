import "../App.css";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

class InfiniteScrollComponent extends Component {
  
  render() {
    const {items, pagination, fetchData } = this.props;
    console.log('propss',this.props)

    return (
      <InfiniteScroll
        dataLength={typeof items !== "undefined" ? items.length : 250}
        next={fetchData}
        hasMore={pagination}
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

export default InfiniteScrollComponent;
