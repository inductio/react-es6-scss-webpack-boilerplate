var Visualizer = require('webpack-visualizer-plugin');

var currentDateTime = new Date();
var currentDate = currentDateTime.toLocaleDateString('en-GB').replace(/\//g, "-");
var currentTime = currentDateTime.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, "-");
var fileDateTime = currentDate + "-" + currentTime;
var statisticsFileName = '../webpack/stats/statistics-' + fileDateTime + '.html';

const prodConfig = require('./webpack.production.config');
prodConfig.plugins = prodConfig.plugins.concat(
    new Visualizer({
        filename: statisticsFileName
    }));
module.exports = prodConfig;