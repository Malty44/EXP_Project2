const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  const data = {
    title: 'Home Page',
    heading: 'Welcome to Our Website',
    content: 'This is the content of the home page.',
    products: [
      { id: 1, name: 'Product 1', description: 'This is Product 1', price: 19.99 },
      { id: 2, name: 'Product 2', description: 'This is Product 2', price: 24.99 },
      { id: 3, name: 'Product 3', description: 'This is Product 3', price: 14.99 }
    ],
    year: new Date().getFullYear(),
    company: 'My Company'
  };

  res.render('home', data);
});



module.exports = router;