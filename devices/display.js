var constants = require('../constants');
var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(constants.portOffset + constants.displayPort, 0x3E, 0x62);

function showInitScreen() {
  display.setColor(255, 0, 0);
  display.setCursor(0,0);
  display.write('Please wait');
  display.setCursor(1, 0);
  display.write('Starting sensors');
  display.setColor(0, 255, 0);
  display.clear();
}

function showCollectingScreen(index, batchSize) {
  display.setColor(255, 255, 255);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Data: ' + index + '/' + batchSize);
}

function showSendingScreen() {
  display.setColor(255, 255, 0);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Sending data...');
}

function showSchedulingScreen() {
  display.setColor(0, 0, 255);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Scheduling...');
}

function showErrorScreen() {
  display.setColor(255, 0, 0);
  display.setCursor(0,0);
  display.write('SleepC');
  display.setCursor(1, 0);
  display.write('Error!');
}


function clearScreen() {
  display.clear();
}

module.exports = {
  showInitScreen: showInitScreen,
  showCollectingScreen: showCollectingScreen,
  showSendingScreen: showSendingScreen,
  showSchedulingScreen: showSchedulingScreen,
  clearScreen: clearScreen
};