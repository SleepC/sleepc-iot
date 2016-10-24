var http = require('http');
var constants = require('./constants');

function sendReport(report) {
  return new Promise(function(resolve, reject){
    var options = {
      hostname: constants.apiHost,
      port: 80,
      path: constants.apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        resolve();
        return;
      });
    });
    req.on('error', function(e) {
      console.log(e.message);
      resolve();
      return
    });
    req.write(JSON.stringify(report));
    req.end();
  });
}

module.exports = {
  sendReport: sendReport
};