import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";

const Diagnostics = ({ initSdk, beacons }) => {
  const history = useHistory();

  return (
    <NavBar
      icon={<Icon type="left" />}
      onLeftClick={() => {
        history.push("/");
      }}
    >
      <p>{initSdk ? `Connected (${beacons.length})` : "Not connected"}</p>
    </NavBar>
    // <div >
    //   <p>Beacons count: {beacons.length}</p>
    //   {Array.from(
    //     beacons.map(([k, v]) => {
    //       return <p>{`${k} (${v.format("h:mm:ss")})`}</p>;
    //     })
    //   )}
    // </div>
  );
};

export default Diagnostics;
