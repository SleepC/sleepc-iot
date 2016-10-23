var constants = require('../constants');
var Sensor = require('jsupm_gas').TP401;

function AirQuality() {
  var that = this;
  that.sensor = new Sensor(constants.portOffset + constants.airQualityPort);

  function airQuality(value)
  {
      if(value < 50) return "Fresh Air";
      if(value < 200) return "Normal ";
      if(value < 400) return "Low";
      if(value < 600) return "Very Low";
      return "Very High Pollution - Take Action Immediately";
  }

  function getData() {
    var value = that.sensor.getSample();
    return Math.round(value) + ': ' + airQuality(value);
  }

  return {
    name: 'Air',
    getData: getData
  };
}

module.exports = AirQuality;