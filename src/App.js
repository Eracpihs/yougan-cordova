import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bmsSettings: "pending",
      bmsConnected: "pending"
    };
  }

  componentDidMount() {
    let enableAlert = false; // whether to show notification when a minisite is triggered
    let enableBackground = true; // whether to enable beacon scanning in background mode
    let enableSite = true; // whether to enable minisite feature
    let minisitesView = "LIST"; // choose either 'LIST' to display
    let autoSiteDuration = 0; // if minisite view mode is 'AUTO', this specifies number of
    let tracking = true; // whether to enable tracking feature and send tracking data to BMS
    let enableMQTT = true; // whether to use MQTT or normal RESTful endpoint to send tracking data
    let attendance = true; // whether to enable attendance feature
    let checkinDuration = 15; // duration of the device staying in the authorized zones to be considered "checked in"
    let checkoutDuration = 15; // duration of the device staying out of the authorized zones to be considered "checked out"

    // ibeacons that you want to return distance callback
    let iBeacons = [];

    let bmsEnvironment = "DEV"; // BMS environment, default is "PROD"

    try {
      window.cordova.plugins.BmsCordovaSdkPublic.setting(
        enableAlert,
        enableBackground,
        enableSite,
        minisitesView,
        autoSiteDuration,
        tracking,
        enableMQTT,
        attendance,
        checkinDuration,
        checkoutDuration,
        iBeacons,
        bmsEnvironment,
        success => {
          this.setState({ bmsSettings: "true" });
        },
        error => {
          this.setState({ bmsSettings: "failed" });
        }
      );

      window.cordova.plugins.BmsCordovaSdkPublic.initSDK(
        "REDACTED",
        success => {
          this.setState({ bmsConnected: "true" });
        },
        error => {
          this.setState({
            bmsConnected: "failed"
          });
          console.log("error", error);
        }
      );
    } catch (e) {
      console.log("exception", e);
    }
  }

  render() {
    const { bmsSettings, bmsConnected } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {/* <p>{.BmsCordovaSdkPublic}</p> */}
          <p>Settings: {bmsSettings}</p>
          <p>Connected: {bmsConnected}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
