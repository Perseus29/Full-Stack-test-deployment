const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');
const app = express();
require('dotenv').config();

const db = 'mongodb+srv://Priyanshu:Winomeo@mern-todo.ur19suk.mongodb.net/mern-todo?retryWrites=true&w=majority';

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected"))
    .catch(console.error);


app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.get('/', async (req, res) => {
    res.json("hey!");
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})


app.listen(port, () => console.log(`Server started on port ${port}`));