global.rootPath = __dirname;
global.rootRequire = name => require(`${__dirname}/${name}`);

const express = require('express');
const path = require('path');
const logger = require('morgan');
const properties = require('./utils/properties');
const yaml = require('./utils/yaml');
console.log(`Properties: ${properties.get('app.name')}`);
console.log(`Yaml      : ${yaml.app.name}`);

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const app = express();

app.set('view engine', 'pug');
let globalCounter = 1;

// Duration Logger: Start
app.use(function(req, res, next)
{
    const startDate = new Date();
    const counter = globalCounter++;

    res.locals.startDate = startDate;
    res.locals.counter = counter;

    console.log(`Start Date ${counter}: `, startDate);
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.xml());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

const calculateDuration = (req, res) =>
{
    const counter = res.locals.counter;
    const startDate = res.locals.startDate;
    const endDate = new Date();
    const duration = endDate - startDate;

    console.log(`End Date ${counter}  : `, endDate);
    console.log(`Duration ${counter}  : `, duration);
}

// Duration Logger: End
app.use(function(req, res, next)
{
    calculateDuration(req, res);
    res.end();
});

// Error handler.
app.use(function(err, req, res, next)
{
    calculateDuration(req, res);

    console.log('Error handler...');

    // Set res.locals, only providing error in development.
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page.
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
