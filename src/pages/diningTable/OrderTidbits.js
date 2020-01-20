import React, { useState } from "react";
import arrayDiffer from "array-differ";
import OrderCarousel from "./OrderCarousel";
import { Toast } from "antd-mobile";

const OrderTidbits = ({ shopId = "", users = [] }) => {
  const [prevUsers, setPrevUsers] = useState([]);

  const newUsers = getNewUsers(users, prevUsers);

  const usersRemoved = getNewUsers(prevUsers, users);

  if (usersRemoved.length) {
    setPrevUsers(users);
  }

  if (newUsers.length) {
    setPrevUsers(users);
    openNotification(newUsers);
  }

  return <OrderCarousel users={users} />;
};

export default OrderTidbits;

const getNewUsers = (users, prevUsers) => {
  const prevUserIds = prevUsers.map(p => p._id);
  const userIds = users.map(u => u._id);

  const newUserIds = arrayDiffer(userIds, prevUserIds);

  return users.filter(u => newUserIds.includes(u._id));
};

const openNotification = newUsers => {
  // TODO: Enhance toast

  Toast.info(<h1>{newUsers.map(u => u.firstName)}，欢迎你!</h1>);
};
