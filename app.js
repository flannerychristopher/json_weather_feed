const http = require('http');

const reqData = {
  apiKey: 'cacdf29dc2be47d484a105606152306',
  url: 'http://api.apixu.com/v1/',
}

function printWeather(location, temperature, condition) {
  message = `${location}, ${temperature}, ${condition}`;
  console.log(message);
}

function getWeather(location) {
  const request = http.get(`${reqData.url}current.json?key=${reqData.apiKey}&q=${location}`, (res) => {

    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      printWeather(parsedData.location.name, parsedData.current.temp_c, parsedData.current.condition.text);
    });
  });
}

// const cities = ['Singapore', 'Boston', 'Tokyo'];
const cities = process.argv.slice(2);
cities.forEach(getWeather);
