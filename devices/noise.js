var constants = require('../constants');
var upmMicrophone = require("jsupm_mic");

function Noise() {
  var that = this;
  that.sensor = new upmMicrophone.Microphone(constants.portOffset + constants.noisePort);

  var threshContext = new upmMicrophone.thresholdContext;
  threshContext.averageReading = 0;
  threshContext.runningAverage = 0;
  threshContext.averagedOver = 2;
  
  function getData() {
    var buffer = new upmMicrophone.uint16Array(128);
    var len = that.sensor.getSampledWindow(2, 128, buffer);
    if (len) {
      var threshold = that.sensor.findThreshold(threshContext, 30, buffer, len);
      return threshold;
    }
  }

  return {
    name: 'Noise',
    getData: getData
  };
}

module.exports = Noise;