const express = require('express');
const router = express.Router();
const csvdb = require('csv-database');
const { v4: uuidv4 } = require('uuid');
const isLoggedIn = require('../middlewares/isLoggedIn');
const path = require('path');

const getTasksDB = async () => {
    const filePath = path.join(__dirname, 'data', 'tasks.csv');
    return await csvdb(filePath, ["id", "title", "description", "status", "dueDate", "userId"]);
};

router.get('/', isLoggedIn, async (req, res) => {
    const tasksDB = await getTasksDB();
    const tasks = await tasksDB.get({userId: req.user?.id});
    res.json(tasks);
});

// Create a new task
router.post('/', isLoggedIn, async (req, res) => {
    const tasksDB = await getTasksDB();

    const id = uuidv4();
    const newTask = await tasksDB.add({id, ...req.body, userId: req.user?.id});
    res.json({ task: newTask[0], message: `Task ${newTask[0].title} added successfully` });
});

// Update an existing task
router.put('/:id', isLoggedIn, async (req, res) => {
    const tasksDB = await getTasksDB();

    const updatedTask = await tasksDB.edit({id: req.params.id, userId: req.user?.id}, req.body);
    if (updatedTask.length) return res.json({task: updatedTask[0], message: `Task ${updatedTask[0].title} updated successfully`});
    res.status(400).json({message: 'Task does not exist'});
});

// Delete a task
router.delete('/:id', isLoggedIn, async (req, res) => {
    const tasksDB = await getTasksDB(req.user?.id);

    const deletedTask = await tasksDB.delete({id: req.params.id});
    if (deletedTask.length) return res.json({task: deletedTask[0], message: `Task ${deletedTask[0].title} deleted successfully` });
    res.status(400).json({message: 'Task does not exist'});
});

module.exports = router;