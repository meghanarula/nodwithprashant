
const express = require('express')

const app = express();

var TodoList = ['Wake up', ' Do code', 'sleep','Loop'];

app.use(function (req, res, next) {
    console.log("I always run")
    next()
})

app.use('/todos ', (req, res, next) => {
    console.log("You requested List of Todo's")
    next()
})

app.use('/todos/add', (req, res, next) => {
    console.log("you requested to add new task in todos")
    if (typeof req.query.task === 'undefined')
        res.send("<h1>TASK NOT PROVIDED.");
    else
        next();
})

app.use('/todos/delete', (req, res, next) => {
    console.log('you requested to delete one task from todos')
    if (typeof req.query.id === 'undefined' || typeof req.query.id < 0)
        res.send("<h1>PROVIDE AN ID TO DELETE</h1>");
    next();
})

app.use('/todos/update', (req, res, next) => {
    console.log('you requested to update task in todos')
    if (typeof req.query.id === 'undefined' || typeof req.query.id < 0
        & typeof req.query.task === 'undefined') {
        res.send("<h1>PROVIDE AN ID and task to update</h1>");
    }
    else {
        next();
    }
})


app.get('/', function (req, res) {
    res.send('Hello world')
});

app.get('/todos', function (req, res) {
    console.log("You requested list of todos")
    res.send(createUOL())
})

app.get('/todos/add', function (req, res) {
    console.log("you requested to add element in todo")
    let task = req.query.task;
    TodoList.push(task);
    res.send(createUOL());
})

app.get('/todos/delete', function (req, res) {
    console.log("you requested to delete one element in todo")
    let id = req.query.id;
    TodoList.splice(id, 1);
    res.send(createUOL());
})

app.get('/todos/update', function (req, res) {
    console.log("you requested to update element in todo");
    let id = req.query.id;
    let task = req.query.task;
    TodoList[id] = task;
    res.send(createUOL())


    
})

app.use((req, res) => {
    res.send("<h1>PAGE NOT FOUND.</h1>");
});

function createUOL() {
    let result = "<h1 style='color:red'><ul>";
    TodoList.forEach(element => {
        result += "<li>" + element + "</li>";
    });
    result += "</ul></h1>";
    return result;
}


app.listen(3000, function () {
    console.log("server started on port 3000");
});