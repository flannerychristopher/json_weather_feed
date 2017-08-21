const http = require('http');
const api = require('./api.json');

function printWeather(location, temperature, condition) {
  message = `${location}, ${temperature}, ${condition}`;
  console.log(message);
}

function printError(e) {
  console.error(e.message);
}

function get(location) {
  const originalQuery = location.replace('_', ' ');
  let error;
  try {
    const request = http.get(`http://api.apixu.com/v1/current.json?key=${api.key}&q=${location}`, (res) => {
      if (res.statusCode === 200) {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            res.setEncoding('utf8');
            const parsedData = JSON.parse(rawData);
            if (parsedData.location) {
              printWeather(parsedData.location.name, parsedData.current.temp_c, parsedData.current.condition.text);
            } else {
              error = new Error(`Could not find weather for ${originalQuery}`);
              console.log(error);
            }

          } catch (e) {
            printError(e);
          }
        });

        res.on('error', (e) => {
          printError(e);
        });

      } else {
        const message = `There was an error fetching the weather for ${originalQuery}: (${http.STATUS_CODES[res.statusCode]})`;
        error = new Error(message);
        printError(error);
      }
    });

  } catch (e) {
    console.error(e.message);
  }
}

module.exports.get = get;
