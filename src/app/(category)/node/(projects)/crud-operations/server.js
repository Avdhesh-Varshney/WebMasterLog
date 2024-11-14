const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/config');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, description });
  });
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) throw err;
    res.json({ id, name, description });
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Item deleted' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
