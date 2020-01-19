import React, { useState } from "react";
import arrayDiffer from "array-differ";
import OrderCarousel from "./OrderCarousel";
import { Toast } from "antd-mobile";

const OrderTidbits2 = ({ shopId = "", users = [] }) => {
  const [prevUsers, setPrevUsers] = useState([]);

  const newUsers = getNewUsers({ users, prevUsers });
  newUsers.forEach(u => {
    openNotification(newUsers);
  });

  console.log("user:", users);

  return (
    // <div className="vvvvv">
    <OrderCarousel users={users} />
    // </div>
  );
};

export default OrderTidbits2;

const getNewUsers = ({ users, prevUsers }) => {
  const prevUserIds = prevUsers.map(p => p.id);
  const userIds = users.map(u => u.id);

  const newUserIds = arrayDiffer(userIds, prevUserIds);

  return users.filter(u => newUserIds.includes(u.id));
};

const openNotification = newUsers => {
  // TODO: Enhance toast

  Toast.info(`欢迎你，${newUsers.map(u => u.firstName)}`);
  // console.log("previousNearbyUsers:", previousNearbyUsers);
  // console.log("newUsers:", newUsers);
};
