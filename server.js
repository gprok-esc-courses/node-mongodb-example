const express = require('express');
const parser = require('body-parser');
const mongo = require('./mongo');

const app = express();

app.use(parser.json());

app.get('/tasks', mongo.getTasks);
app.post('/add/task', mongo.addTask);

app.listen(3001);