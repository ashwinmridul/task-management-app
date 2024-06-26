var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({message: 'Server error!!'});
});

module.exports = app;
