import React from "react";
import { Flex, Grid, Toast } from "antd-mobile";

const SelectUser = ({ users, onSelectUser }) => {
  const handleSelectUser = ({ user }) => {
    const { telephone } = user;
    if (telephone) {
      const last4Digits = prompt("请输入您的手机尾号(后四位)", "手机尾号");

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
      {users && (
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
      {/* <Modal
        className="choose-yourself--telephone-modal"
        visible={showPhonetailNumberPage}
        onOk={e =>
          toggleToRecommendPage(
            history,
            shopId,
            tailNumber,
            currentUser,
            setIsWrongNumber
          )
        }
        onCancel={e => setShowPhonetailNumberPage(false)}
        cancelText="取消"
        okText="确定"
      >
        <Input
          placeholder="请输入您的手机尾号(后四位)"
          onChange={e => setTailNumber(e.target.value)}
          maxLength={4}
        />
        {isWrongNumber && (
          <p className="choose-yourself--number-reminder">
            {" "}
            手机尾号错误，请重新输入
          </p>
        )}
      </Modal> */}
    </div>
  );
};

export default SelectUser;

const handleClickUser = (
  currentUser,
  setCurrentUser,
  setShowPhonetailNumberPage
) => {
  setCurrentUser(currentUser);
  setShowPhonetailNumberPage(true);
};

const toggleToRecommendPage = (
  history,
  shopId,
  tailNumber,
  currentUser,
  setIsWrongNumber
) => {
  const { _id, telephone } = currentUser;
  const tailnumber = telephone.substring(7, 11);
  if (tailnumber === tailNumber) {
    history.push(`/recommendPage/${_id}/${shopId}`);
  } else {
    setIsWrongNumber(true);
    setTimeout(() => {
      setIsWrongNumber(false);
    }, 2000);
  }
};
