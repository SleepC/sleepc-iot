/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
var constants = require('./constants');
var Temperature = require('./devices/temperature');
var Noise = require('./devices/noise');
var AirQuality = require('./devices/airQuality');
var Motion = require('./devices/motion');
var api = require('./api');

var lcd = require('jsupm_i2clcd');

var display = new lcd.Jhd1313m1(constants.portOffset + 0, 0x3E, 0x62);
var devices = [
   new Temperature(),
   new Noise(),
   new AirQuality(),
   new Motion()
];

init();
appLoop();

function appLoop() {
  reportDevices();
}

function reportDevices() {
  var reports = [];
  clear();
  for (var batchCounter = 0; batchCounter < constants.reportinBatchSize; batchCounter++) {
    setCollecting(batchCounter,constants.reportinBatchSize);
    reports.push(getReport());
  }
  setSending();
  api.sendReport(reports).then(function() {
    setScheduling();
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

function clear() {
  display.clear();
}
function setCollecting(index, batchSize) {
  display.setColor(255, 255, 255);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Data: ' + index + '/' + batchSize);
}

function setSending() {
  display.setColor(255, 255, 0);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Sending data...');
}

function setScheduling() {
  display.setColor(0, 0, 255);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Scheduling...');
}

function init() {
  display.setColor(255, 0, 0);
  display.setCursor(0,0);
  display.write('Please wait');
  display.setCursor(1, 0);
  display.write('Starting sensors');
  display.setColor(0, 255, 0);
  display.clear();
}