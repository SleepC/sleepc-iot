/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
var constants = require('./constants');
var Temperature = require('./devices/temperature');
var Noise = require('./devices/noise');
var AirQuality = require('./devices/airQuality');
var Motion = require('./devices/motion');
var display = require('./devices/display');
var api = require('./api');

var lcd = require('jsupm_i2clcd');

var devices = [
 new Temperature(),
 new Noise(),
 new AirQuality(),
 new Motion()
];

display.showInitScreen();
reportDevices();

function reportDevices() {
  var reports = [];
  display.clearScreen();
  for (var batchCounter = 0; batchCounter < constants.reportinBatchSize; batchCounter++) {
    display.showCollectingScreen(batchCounter, constants.reportinBatchSize);
    reports.push(getReport());
  }
  display.showSendingScreen();
  api.sendReport(reports).then(function() {
    display.showSchedulingScreen();
    setTimeout(reportDevices, 500);
  }).catch(function(){
    display.showErrorScreen();
    setTimeout(reportDevices, 500);
  });
}

function getReport() {
  var report = {
    date: new Date().toISOString()
  };
  devices.forEach(function(device) {
    report = Object.assign(report, device.getData());
  });
  return report;
}