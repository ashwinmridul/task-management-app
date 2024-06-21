const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const task = require('../models/task');

router.get('/', isLoggedIn, async (req, res) => {
    task.getTasks(req.user?.id, (err, result) => {
        if (err) return res.status(500).json({message: "Error in fetching tasks"});
        res.json(result);
    });
});

// Create a new task
router.post('/', isLoggedIn, async (req, res) => {
    task.addTask(req.body.title, req.body.description, req.user?.id, req.body.dueDate, (err, result) => {
        if (err) return res.status(500).json({message: `Error in adding task ${req.body.title}`});
        res.json({ task: result, message: `${result.title} added successfully` });
    });
    
});

// Update an existing task
router.put('/:id', isLoggedIn, async (req, res) => {
    task.updateTask(req.body.status, req.params.id, req.user?.id, (err, result) => {
        if (err) return res.status(500).json({message: `Error in updating task`});
        res.json({ task: result, message: `${result.title} updated successfully` });
    });
});

// Delete a task
router.delete('/:id', isLoggedIn, async (req, res) => {
    task.deleteTask(req.params.id, req.user?.id, (err, result) => {
        if (err) return res.status(500).json({message: `Error in deleting task`});
        res.json({ task: result, message: `${result.title} deleted successfully` });
    });
});

module.exports = router;