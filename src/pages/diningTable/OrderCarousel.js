import React from "react";
import { Carousel } from "antd-mobile";

const OrderCarousel = ({ users = [] }) => {
  const carouselItems = getCarouselItemsFromUsers(users);

  return (
    <Carousel
      // autoplay
      className="order-tidbits--carousel"
      autoplaySpeed={5000}
      effect="fade"
    >
      {carouselItems.map((carouselItem, index) => {
        if (carouselItem.images) {
          return (
            <div key={index}>
              <img
                className="order-tidbits--food-images"
                src={carouselItem.images && carouselItem.images[0]}
                alt=""
              />
              <p className="order-tidbits--food-descriptions">
                {carouselItem.description && carouselItem.description}
              </p>
            </div>
          );
        }
      })}
    </Carousel>
  );
};

export default OrderCarousel;

const getCarouselItemsFromUsers = users => {
  const carouselItems = [];

  users.forEach(user => {
    const { firstName, _id } = user;
    const { currentOrders } = user;

    if (currentOrders.length) {
      currentOrders.forEach(currentOrder => {
        if (currentOrder) {
          const { menuItems } = currentOrder;

          menuItems &&
            menuItems.forEach(menuItem => {
              carouselItems.push({ firstName, userId: _id, ...menuItem });
            });
        } else {
          carouselItems.push({ firstName, userId: _id });
        }
      });
    } else {
      carouselItems.push({ firstName, userId: _id });
    }
  });

  return carouselItems;
};
