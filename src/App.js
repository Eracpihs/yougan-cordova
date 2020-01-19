import React, { Component } from "react";
import "./App.scss";
import { beaconListener } from "./apis";
import Diagnostics from "./components/Diagnostics";
import { Route, HashRouter } from "react-router-dom";
import Setup from "./pages/Setup";
import "antd-mobile/dist/antd-mobile.css";
import { DiningTable, Counter } from "./pages";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initSdk: false,
      userId: "",
      beacons: []
    };
  }

  componentDidMount() {
    beaconListener.init({
      customer: {
        name: "adam_chan",
        phone: "+65 92376948",
        email: "adam@raspberri.es"
      },
      onInit: this.handleInitBeaconListener,
      onBeacons: this.handleBeacons,
      userId: ""
    });
  }

  handleBeacons = beacons => {
    this.setState({ beacons });
  };

  handleInitBeaconListener = () => {
    this.setState({ initSdk: true });
  };

  handleSelectShop = shop => {
    this.setState({ shop });
  };

  render() {
    const { initSdk, beacons, shop } = this.state;

    return (
      <div>
        <HashRouter>
          <Diagnostics initSdk={initSdk} beacons={beacons} />
          <div
            style={{
              boxSizing: "border-box",
              height: "100vh",
              padding: "10vw"
            }}
          >
            <Route exact path="/">
              <Setup onSelectShop={this.handleSelectShop} />
            </Route>
            <Route path="/dining-table">
              <DiningTable />
            </Route>
            <Route path="/counter">
              <Counter shop={shop} beacons={beacons} />
            </Route>
            <Route path="/welcome-mat">
              <Counter />
            </Route>
          </div>
        </HashRouter>
      </div>
    );
  }
}
