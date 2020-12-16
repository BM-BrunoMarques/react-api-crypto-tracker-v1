import "../App.css";
import React, { Component } from 'react';
import { servicePing } from "../utils/api.js";

class App extends Component {
  componentDidMount (){
    servicePing();
  }
  render() {
    return (
      <div className="App">
        <h1>Api</h1>
      </div>
    );
  }
}

export default App;