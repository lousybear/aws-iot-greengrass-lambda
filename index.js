const ggSdk = require("aws-greengrass-core-sdk");

const iotClient = new ggSdk.IotData();
const os = require("os");
const util = require("util");

function publishCallback(err, data) {
  console.log(err);
  console.log(data);
}

const myPlatform = util.format("%s-%s", os.platform(), os.release());
const pubOpt = {
  topic: "hello/world",
  payload: JSON.stringify({
    message: util.format(
      "Hello world! Sent from Greengrass Core running on platform: %s using NodeJS",
      myPlatform
    ),
  }),
  queueFullPolicy: "AllOrError",
};

function greengrassHelloWorldRun() {
  iotClient.publish(pubOpt, publishCallback);
}

setInterval(greengrassHelloWorldRun, 5000);

exports.handler = function handler(event, context) {
  console.log(event);
  console.log(context);
};
