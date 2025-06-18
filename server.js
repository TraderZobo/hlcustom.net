const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'json', 'projects.json');

app.use(express.static('.'));
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Routes
app.get('/api/projects', (req, res) => res.json(readData()));

app.post('/api/projects', (req, res) => {
  const projects = readData();
  projects.push(req.body);
  writeData(projects);
  res.sendStatus(201);
});

app.delete('/api/projects/:index', (req, res) => {
  const projects = readData();
  projects.splice(req.params.index, 1);
  writeData(projects);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Project Tracker running at http://localhost:${PORT}/project-tracker.html`);
});
