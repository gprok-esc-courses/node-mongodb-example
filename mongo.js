const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://demo:QEZHTFRVCUP0Pono@cluster0.jnw32.mongodb.net/project_management?retryWrites=true&w=majority';

const getTasks = async (req, res, next) => {
    const client = new MongoClient(url);
    let tasks;
    try {
        await client.connect();
        const db = client.db();
        tasks = await db.collection('mytasks').find().toArray();
    }
    catch(error) {
        return res.json({error: 'Could not connect to DB'});
    }
    client.close();

    return res.json(tasks);
}

const addTask = async (req, res, next) => {
    const task = {
        name: req.body.name,
        completed: false,
    }
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('mytasks').insertOne(task);
    }
    catch(error) {
        return res.json({error: 'Could not save task'});
    }
    client.close();

    res.json(task);
}

exports.getTasks = getTasks;
exports.addTask = addTask;