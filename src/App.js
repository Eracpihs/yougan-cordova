import React, { Component } from "react";
import "./App.scss";
import { beaconListener } from "./apis";
import Diagnostics from "./components/Diagnostics";
import { Route, HashRouter } from "react-router-dom";
import Setup from "./pages/Setup";
import "antd-mobile/dist/antd-mobile.css";
import { DiningTable, Counter } from "./pages";
import getUsersByBeaconMinors from "./query/GetUsersByBeaconMinors";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initSdk: false,
      userId: "",
      beacons: [],
      users: []
    };
  }

  componentDidMount() {
    beaconListener.init({
      customer: {
        name: "adam_chan",
        phone: "+65 92376948",
        email: "adam@raspberri.es"
      },
      onInit: this.handleInitBeaconListener,
      onBeacons: this.handleBeacons,
      userId: ""
    });

    // TODO: Remove after testing
    // setTimeout(() => {
    //   this.handleBeacons(["3"]);
    // }, 5000);
    // setTimeout(() => {
    //   this.handleBeacons(["1", "4"]);
    // }, 10000);
  }

  handleBeacons = beacons => {
    const beaconMinors = beacons.map(beacon => {
      return `${beacon[0]}`;
    });

    getUsersByBeaconMinors(beaconMinors).then(res => {
      const {
        data: { getUsersByBeaconMinors }
      } = res;

      this.setState({
        users: getUsersByBeaconMinors,
        beacons
      });
    });
  };

  handleInitBeaconListener = () => {
    this.setState({ initSdk: true });
  };

  handleSelectShop = shop => {
    this.setState({ shop });
  };

  handleAddUser = () => {
    const { users } = this.state;
    const unused = userList.filter(
      su => !users.map(u => u._id).includes(su._id)
    );

    if (unused.length > 0) {
      this.setState({ users: [...users, unused[0]] });
    }
  };

  handleRemoveUser = () => {
    const { users } = this.state;
    this.setState({ users: [...users].splice(1) });
  };

  render() {
    const { initSdk, beacons, shop, users } = this.state;

    return (
      <div className="hhhh">
        <HashRouter>
          <Diagnostics
            initSdk={initSdk}
            beacons={beacons}
            onAddUser={this.handleAddUser}
            onRemoveUser={this.handleRemoveUser}
          />
          <div
            style={{
              boxSizing: "border-box",
              height: "100vh",
              padding: "10vw"
            }}
          >
            <Route exact path="/">
              <Setup onSelectShop={this.handleSelectShop} />
            </Route>
            <Route path="/dining-table">
              <DiningTable users={users} />
            </Route>
            <Route path="/counter">
              <Counter shop={shop} users={users} beacons={beacons} />
            </Route>
            <Route path="/welcome-mat">
              <Counter />
            </Route>
          </div>
        </HashRouter>
      </div>
    );
  }
}

const userList = [
  {
    _id: "5e180fddcdd3970024a63791",
    gender: null,
    region: null,
    lastName: null,
    firstName: "jin",
    telephone: "13036591269",
    avatarUrl: "https://i.picsum.photos/id/421/200/300.jpg",
    pastOrders: [],
    beaconMinor: "5",
    currentOrders: [
      {
        _id: "5e1aed0fba18720026c98005",
        user: {
          _id: "5e180fddcdd3970024a63791",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jin",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/421/200/300.jpg"
        },
        status: "unpaid",
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
          }
        ]
      },
      {
        _id: "5e23f86da775810026dad8aa",
        user: {
          _id: "5e180fddcdd3970024a63791",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jin",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/421/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      }
    ],
    outstandingBill: {
      billItems: [
        {
          menuItem: {
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
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 1
        }
      ]
    }
  },
  {
    _id: "5e181064cdd3970024a63792",
    gender: null,
    region: null,
    lastName: null,
    firstName: "lola",
    telephone: "13036591269",
    avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg",
    pastOrders: [],
    beaconMinor: "1",
    currentOrders: [
      {
        _id: "5e23db50a775810026dad8a8",
        user: {
          _id: "5e181064cdd3970024a63792",
          gender: null,
          region: null,
          lastName: null,
          firstName: "lola",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
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
          }
        ]
      },
      {
        _id: "5e23de1da775810026dad8a9",
        user: {
          _id: "5e181064cdd3970024a63792",
          gender: null,
          region: null,
          lastName: null,
          firstName: "lola",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      }
    ],
    outstandingBill: {
      billItems: [
        {
          menuItem: {
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
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 1
        }
      ]
    }
  },
  {
    _id: "5e183e96cdd3970024a63795",
    gender: null,
    region: null,
    lastName: null,
    firstName: "jxq",
    telephone: "13036591269",
    avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg",
    pastOrders: [],
    beaconMinor: "2",
    currentOrders: [
      {
        _id: "5e23f878a775810026dad8ab",
        user: {
          _id: "5e183e96cdd3970024a63795",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      }
    ],
    outstandingBill: {
      billItems: [
        {
          menuItem: {
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
          quantity: 1
        }
      ]
    }
  },
  {
    _id: "5e183e98cdd3970024a63796",
    gender: null,
    region: null,
    lastName: null,
    firstName: "jxq",
    telephone: "13036591269",
    avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg",
    pastOrders: [],
    beaconMinor: "3",
    currentOrders: [
      {
        _id: "5e1aee00ba18720026c9800c",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
      },
      {
        _id: "5e1aee33ba18720026c9800d",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      },
      {
        _id: "5e1aee48ba18720026c9800e",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      },
      {
        _id: "5e1aeed0ba18720026c9800f",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      },
      {
        _id: "5e1aeee6ba18720026c98010",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
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
          }
        ]
      },
      {
        _id: "5e1bc753ba18720026c98011",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      },
      {
        _id: "5e1bead5ba18720026c98014",
        user: {
          _id: "5e183e98cdd3970024a63796",
          gender: null,
          region: null,
          lastName: null,
          firstName: "jxq",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      }
    ],
    outstandingBill: {
      billItems: [
        {
          menuItem: {
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
          },
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 3
        },
        {
          menuItem: {
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
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 1
        }
      ]
    }
  },
  {
    _id: "5e185222cdd3970024a63797",
    gender: null,
    region: null,
    lastName: null,
    firstName: "ll",
    telephone: "13036591269",
    avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg",
    pastOrders: [],
    beaconMinor: "4",
    currentOrders: [
      {
        _id: "5e1bcaddba18720026c98012",
        user: {
          _id: "5e185222cdd3970024a63797",
          gender: null,
          region: null,
          lastName: null,
          firstName: "ll",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
      },
      {
        _id: "5e1bcae2ba18720026c98013",
        user: {
          _id: "5e185222cdd3970024a63797",
          gender: null,
          region: null,
          lastName: null,
          firstName: "ll",
          telephone: "13036591269",
          avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg"
        },
        status: "unpaid",
        menuItems: [
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
          }
        ]
      }
    ],
    outstandingBill: {
      billItems: [
        {
          menuItem: {
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
          },
          quantity: 1
        },
        {
          menuItem: {
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
          quantity: 1
        }
      ]
    }
  }
];
