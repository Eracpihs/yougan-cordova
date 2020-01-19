import React from "react";

const SelectUser = ({ users, onSelectUser }) => {
  return (
    <div className="choose-yourself">
      {users && <h1 className="choose-yourself--reminder">请选择您的信息</h1>}

      <ul className="choose-yourself--informations">
        {users &&
          users.map((user, index) => {
            return (
              <li
                key={index}
                onClick={e => onSelectUser(user)}
                className="choose-yourself--details"
              >
                <img
                  className="choose-yourself--avatar"
                  alt=""
                  src={user.avatarUrl}
                />
                <p className="choose-yourself--name">{user.firstName}</p>
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
