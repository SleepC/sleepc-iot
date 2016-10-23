
var http = require('http');

function sendReport(report) {
  return new Promise(function(resolve, reject){
    var options = {
      hostname: 'u10.ngrok.io',
      port: 80,
      path: '/api/report',
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