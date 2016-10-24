var constants = {
  portOffset: 512,
  displayPort: 0,
  temperatureAmbientPort: 0,
  temperatureObjectPort: 1,
  temperatureObjectButtonPort: 3,
  airQualityPort: 2,
  noisePort: 3,
  motionPort: 4,

  reportinBatchSize: 15,

  apiHost: 'sleepc.eastus.cloudapp.azure.com',
  apiPath: 'api/report'
};

module.exports = constants;