var express = require('express');
var router = express.Router();
var db = require('../models')
var helpers = require("../helpers/todos")


router.route('/')
    .get(helpers.getTodos) //index
    .post(helpers.createTodo) //new


router.route("/:todoId")
    .get(helpers.getTodo) //show
    .put(helpers.updateTodo) //update
    .delete(helpers.deleteTodo) //delete

module.exports = router;