var constants = require('../constants');
var GroveTemp = require('jsupm_grove').GroveTemp;

function Temperature() {
  var that = this;
  that.sensor = new GroveTemp(constants.portOffset + constants.temperaturePort);

  function getData() {
    return that.sensor.value();
  }

  return {
    name: 'Temperature',
    getData: getData
  };
}

module.exports = Temperature;