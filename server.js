// Import express
const express = require('express');
// Initialize express
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import mongoose
const ToDoTask = require("./models/toDoTasks")

dotenv.config();
// EJS is accessed by default in the directory.
app.set("view engine", "ejs");

// Specify where the CSS and image files are placed
app.use(express.static('./public'));
// var bodyParser = require('body-parser');

//middleware
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
});


// root URL
app.get('/', (req, res) => {
    res.render('top.ejs');
  });

app.get('/index', (req, res) => {
    ToDoTask.find({}, (err, tasks) => {
        console.log(tasks);
        res.render("index.ejs", { todoTasks: tasks });
    });

})

app.get('/new', (req, res) => {
    res.render('new.ejs');
})

// A Mongoose model doesn't have an insertOne method. 
// Use the create or save method instead:
app.post('/create', (req, res) => {
    ToDoTask.create({name: req.body.taskName}, (err, doc) => {
        if(err) return console.log(err);
        console.log(`1 document ${req.body.taskName} is added!`);
        res.redirect('/index');
    });
  });

app.get('/edit/:_id', (req, res) => {
    const id = req.params._id;
        ToDoTask.findOne({"_id": id},  (err, task) => {
            res.render("edit.ejs", { todoTask: task });
        });
    });

app.post('/update/:_id', (req, res) => {
    const id = req.params._id;
        ToDoTask.updateOne(
            { "_id": id }, 
            { $set: { "name": req.body.itemName }}, 
            (err, res) => {
                if (err) return res.send(500, err);
                console.log(res);
            });
        res.redirect('/index');
    });


  // I'm doing this through Browser for now. That's why I'm using post
app.post('/delete/:_id', (req, res) => {
    const id = req.params._id;
    ToDoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/index");
    });
});

app.listen(8080, ()=> console.log("app is running on port 8080"));