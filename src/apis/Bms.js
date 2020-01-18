class Bms {
  initSdk = ({
    key,
    beacons,
    customer: { name, phone, email },
    onDistanceBeacons,
    onInit
  }) => {
    let enableAlert = true; // whether to show notification when a minisite is triggered
    let enableBackground = true; // whether to enable beacon scanning in background mode
    let enableSite = true; // whether to enable minisite feature
    let minisitesView = "LIST"; // choose either 'LIST' to display
    let autoSiteDuration = 0; // if minisite view mode is 'AUTO', this specifies number of
    let tracking = true; // whether to enable tracking feature and send tracking data to BMS
    let enableMQTT = true; // whether to use MQTT or normal RESTful endpoint to send tracking data
    let attendance = true; // whether to enable attendance feature
    let checkinDuration = 1; // duration of the device staying in the authorized zones to be considered "checked in"
    let checkoutDuration = 1; // duration of the device staying out of the authorized zones to be considered "checked out"

    // ibeacons that you want to return distance callback

    let bmsEnvironment = "CHINA"; // BMS environment, default is "PROD"

    try {
      window.cordova.plugins.BmsCordovaSdkPublic.setting(
        enableAlert,
        enableBackground,
        enableSite,
        minisitesView,
        autoSiteDuration,
        tracking,
        enableMQTT,
        attendance,
        checkinDuration,
        checkoutDuration,
        beacons,
        bmsEnvironment,
        success => {
          window.cordova.plugins.BmsCordovaSdkPublic.initSDK(
            key,
            success => {
              window.cordova.plugins.BmsCordovaSdkPublic.initCustomer(
                name,
                phone,
                email,
                success => {
                  window.cordova.plugins.BmsCordovaSdkPublic.startSDK(
                    success => {
                      console.log("startService success", success);
                      window.cordova.plugins.BmsCordovaSdkPublic.onDistanceBeacons(
                        success => {
                          onDistanceBeacons(success);
                        },
                        error => {
                          console.log("onDistanceBeacons error", error);
                        }
                      );

                      onInit();
                    },
                    error => {
                      console.log("error", error);
                    }
                  );

                  // window.cordova.plugins.BmsCordovaSdkPublic.checkIn(
                  //   success => {
                  //     console.log("checkIn success", success);
                  //   },
                  //   error => {
                  //     console.log("checkIn error", error);
                  //   }
                  // );

                  // window.cordova.plugins.BmsCordovaSdkPublic.checkOut(
                  //   success => {
                  //     console.log("checkOut success", success);
                  //   },
                  //   error => {
                  //     console.log("checkOut error", error);
                  //   }
                  // );
                },
                error => {
                  console.log("error", error);
                }
              );
            },
            error => {
              console.log("error", error);
            }
          );
        },
        error => {
          console.log("error", error);
        }
      );
    } catch (e) {
      console.log("exception", e);
    }
  };
}

export default new Bms();
