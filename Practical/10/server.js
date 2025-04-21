const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILE = 'tasks.json';

app.use(express.static(__dirname));
app.use(express.json());

// Load tasks
const loadTasks = () => {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");
  return JSON.parse(fs.readFileSync(FILE));
};

// Save tasks
const saveTasks = (tasks) => fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

// Routes
app.get('/tasks', (req, res) => {
  res.json(loadTasks());
});

app.post('/tasks', (req, res) => {
  const tasks = loadTasks();
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const updated = tasks.map(t => t.id == req.params.id ? { ...t, text: req.body.text } : t);
  saveTasks(updated);
  res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = loadTasks().filter(t => t.id != req.params.id);
  saveTasks(tasks);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
