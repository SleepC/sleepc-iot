var constants = require('../constants');
var groveSensor = require('jsupm_grove');

function Temperature() {
  var that = this;
  that.sensor = new groveSensor.GroveTemp(constants.portOffset + constants.temperaturePort);
  that.name = "Temperature";

  function getData() {
    return that.sensor.value();
  }
  return {
    name: 'Temperature',
    getData: getData
  };
}

module.exports = Temperature;