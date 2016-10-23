/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

// change this to false to use the hand rolled version
var useUpmVersion = true;

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var lcd = require('jsupm_i2clcd');

var constants = require('./constants');
var Temperature = require('./devices/temperature');
var Noise = require('./devices/noise');
//var AirQuality = require('./devices/airQuality');

var display = new lcd.Jhd1313m1(constants.portOffset + 0, 0x3E, 0x62);
var devices = [
  //new Temperature(),
  //new Noise(),
  //new AirQuality()
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
  display.setColor(255, 0, 0);
  display.setCursor(0,0);
  display.write('Please wait');
  display.setCursor(1, 0);
  display.write('Starting sensors');
  display.setColor(0, 255, 0);
}