import React, { Component } from "react";
import "./App.css";
import { beaconListener } from "./apis";
import moment from "moment";

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

  render() {
    const { initSdk, beacons } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>Sdk: {initSdk ? "Connected" : "Not connected"}</p>
          <p>Beacons count: {beacons.length}</p>
          {Array.from(
            beacons.map(([k, v]) => {
              return <p>{`${k} (${v.format("h:mm:ss")})`}</p>;
            })
          )}
        </header>
      </div>
    );
  }
}
