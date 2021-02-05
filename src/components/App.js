import "../App.css";
import React, {Component} from "react";
import InfiniteScrollComp from "./InfiniteScrollComp";
import SearchBar from "./SearchBar";

class App extends React.Component {
render() {
  return (
    <div>

        <div>
          <SearchBar />
          <InfiniteScrollComp/>
        </div>

    </div>
  );
}
}

export default App;
