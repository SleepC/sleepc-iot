var constants = require('../constants');
var GroveTemp = require('jsupm_grove').GroveTemp;
var groveMotion = require('jsupm_biss0001');


function Motion() {
  var that = this;
  that.sensor = new groveMotion.BISS0001(constants.portOffset + constants.motionPort);

  function getData() {
    return {
      isMoving: that.sensor.value()
    }
  }

  return {
    name: 'Motion',
    getData: getData
  };
}

module.exports = Motion;