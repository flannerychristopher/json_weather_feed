const http = require('http');
const apiKey = 'cacdf29dc2be47d484a105606152306';
const location = 'Boston';

function printWeather(location, temperature, condition) {
  message = `${location}, ${temperature}, ${condition}`;
  console.log(message);
}

const request = http.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${location}`, (res) => {
  console.dir(res.statusCode);

  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    console.log(rawData);
    const parsedData = JSON.parse(rawData);
    console.log(parsedData);
  })
});
