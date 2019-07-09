const PropertiesReader = require('properties-reader');
const propertiesPath = process.env.NODE_ENV==="production"? './config/application.ini' : `./config/application-${process.env.NODE_ENV}.ini`;

console.log('Loading Properties: ', propertiesPath);
const properties = PropertiesReader(propertiesPath);

module.exports = properties;
