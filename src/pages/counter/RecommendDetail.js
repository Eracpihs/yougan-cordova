import React from "react";
import { Carousel, Button, Popconfirm } from "antd";

function RecommendDetail(props) {
  const { menuItem, onConfirm, userId } = props;

  return (
    <div className="recommend-detail">
      <Carousel autoplay autoplaySpeed={3000}>
        {menuItem.images.map(imageSrc => {
          return <img src={imageSrc} alt="" />;
        })}
      </Carousel>
      <div className="recommend-detail--description">
        {menuItem.description}
      </div>
      <Popconfirm
        title="确定添加到订单？"
        okText="是"
        cancelText="否"
        onConfirm={() => onConfirm(menuItem, userId)}
      >
        <Button className="recommend-detail--purchase">选购</Button>
      </Popconfirm>
    </div>
  );
}

export default RecommendDetail;
