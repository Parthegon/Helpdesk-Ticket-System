const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ticketRoutes = require('./routes/tickets');

// Test route
app.get('/test', (req, res) => {
  res.send('Test works');
});

// API routes
app.use('/api/tickets', ticketRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});