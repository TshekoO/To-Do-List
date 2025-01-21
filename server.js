const express = require('express');
const path = require('path');
const connectDB = require('./db');
const Task = require('./taskModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Route to serve the main HTML file (if applicable)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const { text, completed, dueDate, completedAt } = req.body;
    try {
        const newTask = new Task({ text, completed, dueDate, completedAt });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { text, completed, dueDate, completedAt } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { text, completed, dueDate, completedAt },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});