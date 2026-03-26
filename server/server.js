const express = require('express');
const app = express();

app.use(express.json());

let tickets = [];

// test route
app.get('/test', (req, res) => {
  res.send('Test works');
});

// create ticket
app.post('/api/tickets', (req, res) => {
  const { title, description } = req.body;

  console.log(title, description);

  const newTicket = {
    id: tickets.length + 1,
    title,
    description
  };

  tickets.push(newTicket);

  res.json(newTicket);
});

// get tickets
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.listen(5000, () => {
  console.log('Running on port 5000');
});

// update tickets
app.put('/api/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const ticket = tickets.find(t => t.id === id);

  if (!ticket) {
    return res.status(404).send('Ticket not found');
  }

  if (title) ticket.title = title;
  if (description) ticket.description = description;

  res.json(ticket);
});

// delete tickets
app.delete('/api/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = tickets.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).send('Ticket not found');
  }

  tickets.splice(index, 1);

  res.send('Ticket deleted');
});