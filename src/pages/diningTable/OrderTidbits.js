import React, { useState } from "react";
// import { Carousel, notification } from "antd";
// import GetUsersNearby from "../../graphqlOperation/GetNearbyUsers";
import getUser from "../../query/GetUser";
import getUserBy from "./";

const openNotification = (
  carouselItems,
  previousNearbyUsers,
  setPreviousNearbyUsers,
  bluetoothUuid
) => {
  if (!previousNearbyUsers) {
    setPreviousNearbyUsers(carouselItems);
    setTimeout(() => {
      carouselItems.forEach(carouselItem => {
        // notification.open({
        //   message: `Hello, ${carouselItem.firstName}, 欢迎来到${bluetoothUuid}号桌！`,
        //   key: carouselItem.firstName
        // });
      });
    }, 2000);
  } else {
    let prevUserIds = [];
    let currentUserIds = [];

    carouselItems.forEach(carouselItem => {
      if (currentUserIds.indexOf(carouselItem.userId) === -1) {
        currentUserIds.push(carouselItem.userId);
      }
    });

    previousNearbyUsers.forEach(previousNearbyUser => {
      if (prevUserIds.indexOf(previousNearbyUser.userId) === -1) {
        prevUserIds.push(previousNearbyUser.userId);
      }
    });

    const newUserIds = currentUserIds.filter(currentUserId => {
      if (!prevUserIds.includes(currentUserId)) {
        return currentUserId;
      }
    });

    newUserIds.forEach(newUserId => {
      getUser(newUserId).then(data => {
        const {
          data: { getUser }
        } = data;
        // notification.open({
        //   message: `Hello, ${getUser.firstName}, 欢迎来到${bluetoothUuid}号桌！`,
        //   key: getUser.firstName
        // });
      });
    });
  }
};

export default function OrderTidbits(props) {
  const {
    match: {
      params: { beaconId, bluetoothUuid }
    }
  } = props;

  const { shopId, beacons } = props;

  const [previousNearbyUsers, setPreviousNearbyUsers] = useState(null);

  let isNotify = false;

  // const data = GetUsersNearby(beaconId);
  const data = [];

  let carouselItems = [];
  if (data) {
    if (data.nearbyUsers) {
      data.nearbyUsers.forEach(nearbyUser => {
        const { firstName, _id } = nearbyUser;
        const { currentOrders } = nearbyUser;

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
    }
    isNotify = true;
  }

  return (
    <div className="order-tidbits">
      {/* {isNotify &&
        openNotification(
          carouselItems,
          previousNearbyUsers,
          setPreviousNearbyUsers,
          bluetoothUuid
        )}
      {carouselItems && (
        <Carousel
          autoplay
          className="order-tidbits--carousel"
          autoplaySpeed={5000}
          effect="fade"
        >
          {carouselItems.map(carouselItem => {
            if (carouselItem.images) {
              return (
                <div>
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
      )} */}
    </div>
  );
}
