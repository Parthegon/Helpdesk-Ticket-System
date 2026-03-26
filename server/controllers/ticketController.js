const pool = require('../config/db');

// GET all tickets (with filtering)
const getTickets = async (req, res) => {
  try {
    const { status, priority, assignee } = req.query;

    let query = 'SELECT * FROM tickets';
    let conditions = [];
    let values = [];

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
};

// GET ticket by ID
const getTicketById = async (req, res) => {
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
};

// POST ticket
const createTicket = async (req, res) => {
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
};

// PUT update ticket
const updateTicket = async (req, res) => {
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
};

// DELETE ticket
const deleteTicket = async (req, res) => {
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
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};