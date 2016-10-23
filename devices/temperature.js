var constants = require('../constants');
var tempIRSensor_lib = require('jsupm_otp538u');

var groveSensor = require('jsupm_grove');

//  https://github.com/intel-iot-devkit/upm/issues/450
var voltageFixIndex = 0.45;


function Temperature() {
  var that = this;
  var ambientPort = constants.portOffset + constants.temperatureAmbientPort;
  var objectPort = constants.portOffset + constants.temperatureObjectPort;
  that.sensor =  new tempIRSensor_lib.OTP538U(ambientPort, objectPort);
  that.button =  new groveSensor.GroveButton(constants.portOffset + constants.temperatureObjectButtonPort);

  function roundNum(num, decimalPlaces){
    var extraNum = (1 / (Math.pow(10, decimalPlaces) * 1000));
    return (Math.round((num + extraNum) *
        (Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces));
  }

  function getAmbientTemperature(){
    return roundNum(that.sensor.ambientTemperature(), 2 ) * voltageFixIndex;
  }

  function getObjectTemperature(){
    // See https://github.com/intel-iot-devkit/upm/issues/450
    //return roundNum(that.sensor.objectTemperature(), 2 );
    return that.button.value() ? 37 : getAmbientTemperature();
  }

  function getData() {
    return {
      temperature: getAmbientTemperature(),
      isPersonPresent: getObjectTemperature() > 35,
    };
  }

  return {
    name: '',
    getData: getData
  };
}

module.exports = Temperature;