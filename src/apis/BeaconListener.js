import { bms } from ".";
import moment from "moment";

class BeaconListener {
  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;

    this.beacons = new Map();
  }

  init = ({ customer, onInit, onBeacons }) => {
    bms.initSdk({
      key: "0747d87c85df94c964425be7366681391784a19dc1a6f577eb3c44881629d20f",
      beacons: [...Array(30).keys()].map(k => ({
        uuid: "F7826DA6-4FA2-4E98-8024-BC5B71E0893E",
        major: 10,
        minor: k + 1
      })),
      customer,
      onDistanceBeacons: recordedBeacons => {
        const beaconsMap = this.handleBeacons({ recordedBeacons });
        onBeacons(Array.from(beaconsMap.entries()));
      },
      onInit: () => {
        onInit();

        setInterval(() => {
          const beaconsMap = this.handleBeacons();
          onBeacons(Array.from(beaconsMap.entries()));
        }, 5000);
      }
    });
  };

  handleBeacons = ({ recordedBeacons = [] } = {}) => {
    const { beacons } = this;

    const newBeaconsList = new Map(beacons);

    recordedBeacons.forEach(b => {
      newBeaconsList.set(b.minor, new moment());
    });

    const freshBeacons = Array.from(newBeaconsList.entries()).filter(
      ([k, v]) => {
        return isFreshTimestamp(v);
      }
    );

    this.beacons = new Map(freshBeacons);

    return this.beacons;
  };
}

export default new BeaconListener();

const isFreshTimestamp = timestamp => {
  return !timestamp.isBefore(new moment().subtract(2, "seconds"));
};
