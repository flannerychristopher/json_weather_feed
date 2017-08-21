const weather = require('./weather');

// const cities = ['Singapore', 'Boston', 'Tokyo'];
const search = process.argv.slice(2).join('_').replace(' ', '_');
weather.get(search);
