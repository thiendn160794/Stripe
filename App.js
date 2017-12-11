import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from "lodash"
import {Tab, TabList} from "./Tabs"
import Checkout from './Checkout'
import Charge from './Charge'

class App extends Component {

  constructor(props){
    super();
    this.state = {
      selected : "a"
    }
  }

  render() {
    return (
      <div className = "holder">
        <TabList>
          <Tab name = "Checkout">
            <Checkout/>
          </Tab>
          <Tab name = "Charged" default >
            <Charge/>
          </Tab>
        </TabList>
      </div>
    );
  }
}

export default App;
