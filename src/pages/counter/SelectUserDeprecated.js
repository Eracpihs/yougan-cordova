import React, { useState } from "react";
import { Modal, Input } from "antd";

import GetNearbyUsers from "../../graphqlOperation/GetNearbyUsers";

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

export default function SelectUser(props) {
  const {
    history,
    match: {
      params: { beaconId, shopId }
    }
  } = props;

  const nearbyUsers = GetNearbyUsers(beaconId);
  const [tailNumber, setTailNumber] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isWrongNumber, setIsWrongNumber] = useState(false);
  const [showPhonetailNumberPage, setShowPhonetailNumberPage] = useState(false);

  console.log(nearbyUsers);
  return (
    <div className="choose-yourself">
      {nearbyUsers && (
        <h1 className="choose-yourself--reminder">请选择您的信息</h1>
      )}

      <ul className="choose-yourself--informations">
        {nearbyUsers &&
          nearbyUsers.nearbyUsers.map((currentUser, index) => {
            return (
              <li
                key={index}
                onClick={e =>
                  handleClickUser(
                    currentUser,
                    setCurrentUser,
                    setShowPhonetailNumberPage
                  )
                }
                className="choose-yourself--details"
              >
                <img
                  className="choose-yourself--avatar"
                  alt=""
                  src={currentUser.avatarUrl}
                />
                <p className="choose-yourself--name">{currentUser.firstName}</p>
              </li>
            );
          })}
      </ul>

      <Modal
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
      </Modal>
    </div>
  );
}
