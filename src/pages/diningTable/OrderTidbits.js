import React, { useState } from "react";
import arrayDiffer from "array-differ";
import OrderCarousel from "./OrderCarousel";
import { Toast, Card, Flex, WhiteSpace } from "antd-mobile";

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

  Toast.info(
    <Card>
      <Card.Header title="欢迎你"></Card.Header>
      <Card.Body>
        <Flex wrap="wrap" justify="around">
          {newUsers.map(u => {
            return (
              <Flex direction="column">
                <img src={u.avatarUrl} alt="" />
                <span>{u.firstName}</span>
                <WhiteSpace />
              </Flex>
            );
          })}
        </Flex>
      </Card.Body>
    </Card>
  );
};
