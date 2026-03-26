const express = require('express');
const app = express();
const pool = require('./config/db');

app.use(express.json());

// test route
app.get('/test', (req, res) => {
  res.send('Test works');
});

// GET all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const { status, priority, assignee } = req.query;

    let query = 'SELECT * FROM tickets';
    let conditions = [];
    let values = [];

    // build filters dynamically
    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (priority) {
      values.push(priority);
      conditions.push(`priority = $${values.length}`);
    }

    if (assignee) {
      values.push(assignee);
      conditions.push(`assignee = $${values.length}`);
    }

    // add WHERE if conditions exist
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id ASC';

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET ticket by ID
app.get('/api/tickets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      'SELECT * FROM tickets WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Ticket not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { title, description, priority, status, assignee, comments } = req.body;

    const result = await pool.query(
      `INSERT INTO tickets 
      (title, description, priority, status, assignee, comments) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [
        title,
        description,
        priority || 'Low',
        status || 'Open',
        assignee || null,
        comments || []
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update ticket
app.put('/api/tickets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, priority, status, assignee, comments } = req.body;

    const result = await pool.query(
      `UPDATE tickets 
       SET title = $1, description = $2, priority = $3, status = $4, assignee = $5, comments = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, priority, status, assignee, comments, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Ticket not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE ticket
app.delete('/api/tickets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      'DELETE FROM tickets WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Ticket not found');
    }

    res.send('Ticket deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Running on port 5000');
});