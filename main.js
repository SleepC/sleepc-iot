/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

// change this to false to use the hand rolled version
var useUpmVersion = true;

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var lcd = require('jsupm_i2clcd');

var constants = require('./constants');
var Temperature = require('./devices/temperature');

var display = new lcd.Jhd1313m1(constants.portOffset + 0, 0x3E, 0x62);
var devices = [
  new Temperature()
];

init();
appLoop();

function appLoop() {
  reportDevices();
}

function reportDevices() {
  setTimeout(function() {
    devices.forEach(function(device) {
      reportSensorData(device.name, device.getData());
    });
    reportDevices();
  }, 500);
}

function reportSensorData(name, data) {
  display.setCursor(0,0);
  display.write('Data from sensor');
  display.setCursor(1, 0);
  display.write(name + ': ' + data);
}

function init() {
}