var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://tucker:1momoko@ds111082.mlab.com:11082/todolist');

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");