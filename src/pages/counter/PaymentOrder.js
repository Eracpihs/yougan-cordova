import React, { useState, useEffect } from "react";
import { List, Row, Button, Card } from "antd";
import getUser from "../../graphqlOperation/GetUser";

const { Meta } = Card;

export default function PaymentOrder(props) {
  const [currentUser, setCurrentUser] = useState();
  const {
    match: {
      params: { id }
    }
  } = props;

  useEffect(() => {
    getUser(id)
      .then(res => res.data)
      .then(data => {
        setCurrentUser(data.getUser);
      });
  }, [id]);

  const currentOrders = currentUser && currentUser.currentOrders;

  let menuItems = [];
  let totalPrice = 0;

  if (currentOrders) {
    let items = [];
    currentOrders.forEach(currentOrder => {
      currentOrder.menuItems.forEach(menuItem => {
        items.push(menuItem);
        totalPrice += menuItem.price;
      });
    });

    items.forEach((item, index) => {
      if (index === 0) {
        menuItems.push({ ...item, quantity: 1 });
      } else {
        const menuItemIds = menuItems.map(menuItem => menuItem._id);
        if (menuItemIds.indexOf(item._id) === -1) {
          menuItems.push({ ...item, quantity: 1 });
        } else {
          const index = menuItems.findIndex((item, index, menuItems) => {
            return index;
          });
          menuItems[index].quantity++;
        }
      }
    });
  }

  console.log("menuitems:", menuItems);

  return (
    <div className="order-list">
      <h3 className="order-list--title">我的订单</h3>
      {menuItems.length && (
        <List
          dataSource={menuItems}
          renderItem={(item, key) => (
            <List.Item key={key} className="order-list--items">
              <Card>
                <Meta
                  avatar={<img alt="" src={item.images[0]} />}
                  description={
                    <div className="order-list--items-details">
                      <p>{item.name}</p>
                      <p>单价:{item.price}有感币</p>
                      <p>数量:{item.quantity}</p>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
      <Row
        className="order-list--payment"
        type="flex"
        justify="center"
        align="middle"
      >
        <p className="order-list--payment--total-price">
          合计：${totalPrice}有感币
        </p>
        <Button className="order-list--payment-button">支付</Button>
      </Row>
    </div>
  );
}
