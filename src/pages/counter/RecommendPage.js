import React, { useState, useEffect } from "react";
import { List, Icon, Button, Modal, Popconfirm, Card, Spin } from "antd";
import RecommendDetail from "./RecommendDetail";
import getUser from "../../graphqlOperation/GetUser";
import getShopById from "../../graphqlOperation/GetShopById";
import CreateOrder from "../../graphqlOperation/CreateOrder";

const { Meta } = Card;

const rating = level => {
  let icons = [];
  for (let time = 0; time < level; time++) {
    icons.push(<Icon type="star" theme="filled" />);
  }
  return icons;
};

const toggleToPayentOrder = (history, currentUser) => {
  const { _id } = currentUser;
  history.push(`/paymentOrder/${_id}`);
};

const createNewOrder = (currentMenuItem, userId) => {
  const itemId = currentMenuItem && currentMenuItem._id;
  CreateOrder(userId, itemId)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

export default function RecommendPage(props) {
  const {
    history,
    match: {
      params: { beaconId, shopId }
    }
  } = props;

  const [isShowRecommendDetail, setIsShowRecommendDetail] = useState(false);
  const [currentMenuItem, setcurrentMenuItem] = useState();

  const [userId, setUserId] = useState();
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser);

  useEffect(() => {
    getUser(beaconId)
      .then(res => res.data)
      .then(data => {
        setUserId(data.getUser._id);
        setCurrentUser(data.getUser);
      });
  }, [beaconId, userId]);

  const shop = getShopById(shopId);

  const menuItems = shop && shop.menuItems;

  const recommendItems = menuItems;

  const isShowPayment =
    currentUser && currentUser.currentOrders.length ? true : false;

  return (
    <div className="recommend-page">
      {isShowPayment && (
        <Button
          className="recommend-page--payment"
          onClick={e => toggleToPayentOrder(history, currentUser)}
          type="primary"
        >
          我的订单
        </Button>
      )}

      <h1 className="recommend-page--welcome">
        Hi,
        {currentUser && currentUser.firstName}, 欢迎来到{shop && shop.name},
        我们为你推荐了以下食物哦～
      </h1>
      <List
        className="recommend-page--items"
        grid={{ gutter: 1, xs: 2, sm: 3 }}
        dataSource={recommendItems}
        renderItem={(item, key) => (
          <List.Item
            key={key}
            className="recommend-page--item"
            onClick={() => setcurrentMenuItem(item)}
          >
            <div
              onClick={() => {
                setIsShowRecommendDetail(true);
              }}
            >
              <Card
                cover={
                  <img
                    src={item.images[0]}
                    className="recommend-page--image"
                    alt=""
                  />
                }
              >
                <Meta
                  description={
                    <div className="recommend-page--product">
                      <div className="recommend-page--name">{item.name}</div>

                      <div className="recommend-page--type" span={18}>
                        种类:{item.type}
                      </div>
                      <div className="recommend-page--price" span={6}>
                        单价:{item.price}有感币
                      </div>

                      <div className="recommend-page--recommend-level">
                        推荐指数:
                        <span className="recommend-page--recommend-star">
                          {rating(item.rating)}
                        </span>
                      </div>
                    </div>
                  }
                />
              </Card>
            </div>
            <Popconfirm
              title="确定添加到订单？"
              okText="是"
              cancelText="否"
              onConfirm={e => {
                createNewOrder(currentMenuItem, userId);
              }}
            >
              <Button className="recommend-page--purchase-button">选购</Button>
            </Popconfirm>
          </List.Item>
        )}
      />

      <Modal
        className="recommend-page--detail-modal"
        visible={isShowRecommendDetail}
        onCancel={() => {
          setIsShowRecommendDetail(false);
        }}
        footer={null}
      >
        <RecommendDetail
          menuItem={currentMenuItem}
          userId={userId}
          onConfirm={createNewOrder}
        />
      </Modal>
    </div>
  );
}
