const express = require('express');
const app = express();

const ticketRoutes = require('./routes/tickets');

app.use(express.json());

// test route
app.get('/test', (req, res) => {
  res.send('Test works');
});

// use routes
app.use('/api/tickets', ticketRoutes);

app.listen(5000, () => {
  console.log('Running on port 5000');
});