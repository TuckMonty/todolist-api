/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        alert(err)
    })
    
    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            createTodo();
        }
    })
    
    $('.list').on('click', 'span', function(event){ //listen for clicks on .list spans, which are dynamically added
        event.stopPropagation();
        removeTodo($(this).parent())
    })
    
    $('.list').on('click','li', function(event){
        updateTodo($(this))
    })
})

function createTodo(){
    //send request to create new todo
    var usrInput = $('#todoInput').val()
    $.post('/api/todos', {name:usrInput}) //pass user's input as body of post request
    .then(function(newTodo){
        $('#todoInput').val('')
        addTodo(newTodo)
    })
    .catch(function(err){
        console.log(err)
    })
}


function addTodo(todo){
    //update page with new todo
        var newTodo = $('<li class="task">'+todo.name+'<span>X</span></li>');
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
        if(todo.completed) {
            newTodo.addClass("done");
        }
        $('.list').append(newTodo)
}
function addTodos(todos) {
    //add todos to the page
    todos.forEach(function(todo){
        addTodo(todo)
    })
}

function updateTodo(todo){
    //send request to change status on the server
    var clickedId = todo.data('id')
    var updateUrl = '/api/todos/'+clickedId;
    var isDone = todo.data('completed')
    var updateData = {completed: !isDone}
    $.ajax ({
        method:'PUT',
        url:updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        //update the page to show it
        todo.toggleClass('done')
        todo.data('completed', isDone)
    })
    
}

function removeTodo(todo) {
    var clickedId = todo.data('id')
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url:deleteUrl
    })
    .then(function(data) {
        console.log(data)
        todo.remove();
    })
    .catch(function(err){
        alert(err);
    })
}