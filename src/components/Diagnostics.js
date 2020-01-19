import React, { useState } from "react";
import { NavBar, Icon, Popover } from "antd-mobile";
import { useHistory } from "react-router-dom";

const Diagnostics = ({ initSdk, beacons, onAddUser, onRemoveUser }) => {
  const history = useHistory();
  const [isVisiblePopover, setIsVisiblePopover] = useState(false);

  return (
    <NavBar
      icon={<Icon type="left" />}
      rightContent={[
        rightContent({
          isVisiblePopover,
          setIsVisiblePopover,
          onAddUser,
          onRemoveUser
        })
      ]}
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

const rightContent = ({
  isVisiblePopover,
  setIsVisiblePopover,
  onAddUser,
  onRemoveUser
}) => (
  <Popover
    mask
    visible={isVisiblePopover}
    overlay={[
      <Popover.Item key="1">Add User</Popover.Item>,
      <Popover.Item key="2">Remove User</Popover.Item>
    ]}
    onVisibleChange={() => setIsVisiblePopover(!isVisiblePopover)}
    onSelect={({ key }) => {
      switch (key) {
        case "1":
          onAddUser();
          break;
        case "2":
          onRemoveUser();
          break;
        default:
          // Do nothing
          break;
      }

      setIsVisiblePopover(!isVisiblePopover);
    }}
  >
    <Icon type="ellipsis" />
  </Popover>
);
