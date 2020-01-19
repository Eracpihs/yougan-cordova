import React from "react";
import { Grid, Card, Flex, WhiteSpace, Modal, Icon, Button } from "antd-mobile";

const alert = Modal.alert;

const Recommendation = ({ shop, currentUser }) => {
  // const [isShowRecommendDetail, setIsShowRecommendDetail] = useState(false);
  // const [currentMenuItem, setcurrentMenuItem] = useState();

  // const [userId, setUserId] = useState();
  // const [currentUser, setCurrentUser] = useState();
  // console.log(currentUser);

  // useEffect(() => {
  //   getUser(beaconId)
  //     .then(res => res.data)
  //     .then(data => {
  //       setUserId(data.getUser._id);
  //       setCurrentUser(data.getUser);
  //     });
  // }, [beaconId, userId]);

  // const shop = getShopById(shopId);

  // const isShowPayment =
  //   currentUser && currentUser.currentOrders.length ? true : false;

  const { firstName = "John", lastName = "Doe" } = currentUser || {};
  const { name: shopName = "Shop", menuItems = [] } = shop || {
    _id: "",
    name: "Rocky",
    menuItems: [
      {
        _id: "5e159d9d819b130019711d16",
        name: "Egg McMuffin",
        type: "Burger",
        price: 12.35,
        rating: 4,
        images: [
          "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Egg-McMuffin.jpg?$Product_Desktop$",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/english_muffin.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/round_egg.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/canadian_bacon.png"
        ],
        description:
          "This delicious breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. And all that for 300 calories. melty American cheese. Pass the line when you use Mobile Order & Pay, only on the McDonald’s App!"
      },
      {
        _id: "5e159d9d819b130019711d17",
        name: "Sausage Biscuit with Egg",
        type: "Breakfast Burger",
        price: 15.35,
        rating: 5,
        images: [
          "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Biscuit-with-Egg-Regular-Size-Biscuit.jpg?$Product_Desktop$",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/biscuit.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/folded_egg.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/sausage.png"
        ],
        description:
          "Sausage Biscuit with Egg features a warm biscuit brushed with real butter, sizzling hot sausage, and a fluffy folded egg."
      },
      {
        _id: "5e159d9d819b130019711d18",
        name: "Hotcakes and Sausage",
        type: "Hot Cakes",
        price: 7.35,
        rating: 4,
        images: [
          "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hotcakes-and-Sausage.jpg?$Product_Desktop$",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/hotcake.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/hotcake_syrup.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/sausage.png"
        ],
        description:
          "Hotcakes and Sausage feature three golden brown, melt-in-your-mouth hotcakes with a side of real butter and the sweet flavor of maple. Plus, a side of our savory hot sausage."
      },
      {
        _id: "5e159d9d819b130019711d19",
        name: "Sausage Burrito",
        type: "Burrito",
        price: 5.35,
        rating: 3,
        images: [
          "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Burrito.jpg?$Product_Desktop$",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/scrambled_egg_mix.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/tortilla.png",
          "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/ingredient_american_cheese_180x180.png"
        ],
        description:
          "Start your morning with a Sausage Burrito—fluffy scrambled egg, sausage, melty cheese, green chiles, and onions, all wrapped in a soft tortilla. Use the McDonald’s App to Mobile Order & Pay."
      },
      {
        _id: "5e159d9d819b130019711d1a",
        name: "Hash Browns",
        type: "Snacks",
        price: 2.35,
        rating: 3,
        images: [
          "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-HASH-BROWNS.jpg?$Product_Desktop$"
        ],
        description:
          "Our Hash Browns are deliciously tasty. These shredded potato hash brown patties are prepared so they’re fluffy on the inside and crispy and toasty on the outside."
      }
    ]
  };

  const recommendedItems = getRecommendedItems(menuItems);

  return (
    <div>
      {/* {isShowPayment && (
        <Button
          className="recommend-page--payment"
          onClick={e => toggleToPayentOrder(history, currentUser)}
          type="primary"
        >
          我的订单
        </Button>
      )} */}
      <Flex justify="center">
        <h1>
          Hi {`${firstName}`}, 欢迎来到{shopName}。
        </h1>
      </Flex>
      <Flex justify="center">
        <h2>我们为你推荐了以下食物哦～</h2>
      </Flex>
      <Grid
        // className="recommend-page--items"
        data={recommendedItems}
        columnNum={2}
        isCarousel={true}
        renderItem={item => (
          <div>
            <div
              style={{
                width: "100%",
                height: "100%"
              }}
              onClick={el => {
                confirmOrder(() => {
                  // createNewOrder(currentMenuItem, userId);
                });
              }}
            >
              <img
                style={{
                  width: "100%",
                  objectFit: "cover",
                  paddingTop: "1em"
                }}
                src={item.images[0]}
              />
              <h2
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {item.name}
              </h2>
              {rating(item.rating)}
            </div>
            {/* <Button
              type="primary"
              size="small"
              inline={true}
              onClick={() => {}}
            >
              详细
            </Button> */}
          </div>
        )}
      />
      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default Recommendation;

const rating = level => {
  let icons = [];
  for (let time = 0; time < level; time++) {
    icons.push(<Icon type="check" />);
  }
  return icons;
};

// const toggleToPayentOrder = (history, currentUser) => {
//   const { _id } = currentUser;
//   history.push(`/paymentOrder/${_id}`);
// };

// const createNewOrder = (currentMenuItem, userId) => {
//   const itemId = currentMenuItem && currentMenuItem._id;
//   CreateOrder(userId, itemId)
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err));
// };

const getRecommendedItems = menuItems => {
  // TODO: Put some smarts here
  return menuItems;
};

const confirmOrder = onConfirm => {
  alert("订单", "确定添加到订单？", [
    { text: "否" },
    {
      text: "选购",
      onPress: () => onConfirm()
    }
  ]);
};
