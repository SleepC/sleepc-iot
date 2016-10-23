/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

// change this to false to use the hand rolled version
var useUpmVersion = true;

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();
useUpm();

function useUpm() {
  var lcd = require('jsupm_i2clcd');
  var display = new lcd.Jhd1313m1(512 + 0, 0x3E, 0x62);
  display.setCursor(0,0);
  display.write('Please wait..');
  display.setCursor(1, 0);
  display.write('Sleep Booting...');
}
