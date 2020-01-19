import React, { Component } from "react";
import "./App.scss";
import { beaconListener } from "./apis";
import Diagnostics from "./components/Diagnostics";
import { Route, HashRouter } from "react-router-dom";
import Setup from "./pages/Setup";
import "antd-mobile/dist/antd-mobile.css";
import { DiningTable, Counter } from "./pages";
import getUsersByBeaconMinors from "./query/GetUsersByBeaconMinors";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initSdk: false,
      userId: "",
      beacons: [],
      users: []
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

    // TODO: Remove after testing
    // setTimeout(() => {
    //   this.handleBeacons(["3"]);
    // }, 5000);
    // setTimeout(() => {
    //   this.handleBeacons(["1", "4"]);
    // }, 10000);
  }

  handleBeacons = beacons => {
    // TODO: Fetch users from beacons
    const beaconMinors = beacons.map(beacon => beacon[0]);
    getUsersByBeaconMinors(beaconMinors).then(res => {
      console.log(res);
      const {
        data: { getUsersByBeaconMinors }
      } = res;

      this.setState({
        users: getUsersByBeaconMinors,
        beacons
      });
    });
  };

  handleInitBeaconListener = () => {
    this.setState({ initSdk: true });
  };

  render() {
    const { initSdk, beacons, users } = this.state;

    return (
      <div className="hhhh">
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
              <Setup />
            </Route>
            <Route path="/dining-table">
              <DiningTable users={users} />
            </Route>
            <Route path="/counter">
              <Counter beacons={beacons} />
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
