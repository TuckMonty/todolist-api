var db = require("../models");

//index
exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

//new
exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

//show
exports.getTodo = function(req, res) {
    db.Todo.findById("req.params.todoId")
    .then(function(foundTodo){
       res.json(foundTodo) 
    }) 
    .catch(function(err){
        res.send(err);
    })
}

//update
exports.updateTodo = function(req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true})//by default, mongo will respond with the old version. new:true will tell it to return the updated version
    .then(function(todo){
        res.json(todo)
    })
    .catch(function(err){
        res.send(err)
    })
}

//delete
exports.deleteTodo = function(req, res){
    db.Todo.remove({_id:req.params.todoId})
    .then(function(){
        res.json({message:'We deleted it!'})
    })
    .catch(function(err){
        res.send(err)
    })
}

module.exports = exports;