import React from "react";
import { Flex, Grid, Toast } from "antd-mobile";

const SelectUser = ({ users, onSelectUser }) => {
  const handleSelectUser = ({ user }) => {
    const { telephone } = user;
    if (telephone) {
      const last4Digits = prompt(
        "手机尾号",
        "请输入您的手机尾号(后四位)",
        () => {},
        "手机尾号"
      );

      const actualLast4Digits = telephone.substring(
        telephone.length - 4,
        telephone.length
      );

      if (last4Digits !== actualLast4Digits) {
        Toast.fail("手机尾号错误，请重新输入");
        return;
      }
    }

    onSelectUser({ user });
  };

  return (
    <div className="choose-yourself">
      {users && users.length > 1 && (
        <Flex justify="center">
          <h1>请选择您的信息</h1>
        </Flex>
      )}

      {/* TODO: Use grid instead of li*/}
      {/* <Grid
        data={users.map(u => ({
          icon: u.avatarUrl,
          text: `${u.firstName} ${u.lastName}`
        }))}
      ></Grid> */}

      <ul className="choose-yourself--informations">
        {users &&
          users.map((user, index) => {
            return (
              <li
                key={index}
                onClick={e => handleSelectUser({ user })}
                className="choose-yourself--details"
              >
                <img
                  className="choose-yourself--avatar"
                  alt=""
                  src={user.avatarUrl}
                />
                <p className="choose-yourself--name">
                  {user.firstName} {user.lastName}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectUser;
