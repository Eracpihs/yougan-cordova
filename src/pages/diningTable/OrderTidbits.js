import React, { useState, useEffect } from "react";
import { Carousel, notification, Toast } from "antd-mobile";
import { diff } from "fast-array-diff";
import arrayDiffer from "array-differ";
import getUser from "../../query/GetUser";
import GetUsersByBeaconMinors from "../../query/GetUsersByBeaconMinors";

// const openNotification = (
//   carouselItems,
//   previousNearbyUsers,
//   setPreviousNearbyUsers,
//   setIsNotify
// ) => {
//   if (!previousNearbyUsers) {
//     setPreviousNearbyUsers(carouselItems);
//     setTimeout(() => {
//       if (carouselItems) {
//         carouselItems.forEach(carouselItem => {
//           Toast.info(`Hello, ${carouselItem.firstName}, 欢迎你！`);
//         });
//       }
//     }, 2000);
//     setIsNotify(false);
//   } else {
//     let prevUserIds = [];
//     let currentUserIds = [];

//     carouselItems.forEach(carouselItem => {
//       if (currentUserIds.indexOf(carouselItem.userId) === -1) {
//         currentUserIds.push(carouselItem.userId);
//       }
//     });

//     previousNearbyUsers.forEach(previousNearbyUser => {
//       if (prevUserIds.indexOf(previousNearbyUser.userId) === -1) {
//         prevUserIds.push(previousNearbyUser.userId);
//       }
//     });

//     const newUserIds = currentUserIds.filter(currentUserId => {
//       if (!prevUserIds.includes(currentUserId)) {
//         return currentUserId;
//       }
//     });

//     newUserIds.forEach(newUserId => {
//       getUser(newUserId).then(data => {
//         const {
//           data: { getUser }
//         } = data;
//         Toast.info(`Hello, ${getUser.firstName}, 欢迎你！`);
//       });
//     });
//   }
// };

const openNotification = (
  carouselItems,
  previousNearbyUsers,
  setPreviousNearbyUsers,
  setIsNotify,
  newUsers
) => {
  // console.log("previousNearbyUsers:", previousNearbyUsers);
  // console.log("newUsers:", newUsers);
};

export default function OrderTidbits(props) {
  const { shopId, beacons = [] } = props;

  const [prevBeacons, setPrevBeacons] = useState([]);
  const [newUsers, setNewUsers] = useState();
  const [previousNearbyUsers, setPreviousNearbyUsers] = useState(null);

  const [isNotify, setIsNotify] = useState(false);
  const [carouselItems, setCarouselItems] = useState();

  if (!prevBeacons.length) {
    GetUsersByBeaconMinors(beacons).then(res => {
      const {
        data: { getUsersByBeaconMinors }
      } = res;
      setPreviousNearbyUsers(getUsersByBeaconMinors);
    });
  }

  if (didBeaconsChange(beacons, prevBeacons, setNewUsers, newUsers)) {
    setPrevBeacons(beacons);

    GetUsersByBeaconMinors(beacons).then(res => {
      const {
        data: { getUsersByBeaconMinors }
      } = res;

      console.log("getUsersByBeaconMinors:", getUsersByBeaconMinors);
      let carouselItems = [];

      if (getUsersByBeaconMinors) {
        getUsersByBeaconMinors.forEach(user => {
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
      }
      setIsNotify(true);
      openNotification(
        carouselItems,
        previousNearbyUsers,
        setPreviousNearbyUsers,
        setIsNotify
      );
      setCarouselItems(carouselItems);
    });
  }

  return (
    <div className="order-tidbits">
      {isNotify &&
        openNotification(
          carouselItems,
          previousNearbyUsers,
          setPreviousNearbyUsers,
          setIsNotify,
          newUsers
        )}
      {carouselItems && (
        <Carousel
          autoplay
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
      )}
    </div>
  );
}

const didBeaconsChange = (beacons, prevBeacons, setNewUsers, newUsers) => {
  var diff = arrayDiffer(beacons, prevBeacons);

  if (diff.length) {
    GetUsersByBeaconMinors(diff).then(res => {
      console.log("diff:", diff);

      const {
        data: { getUsersByBeaconMinors }
      } = res;

      console.log("getUsersByBeaconMinors:", getUsersByBeaconMinors);
      setNewUsers(getUsersByBeaconMinors);
      console.log("newUsers:", newUsers);
    });
    return true;
  }
  return false;
};
