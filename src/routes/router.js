const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

// Example route
router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

// Example route with parameter
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`You requested user with ID: ${userId}`);
});

// Error handling
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;