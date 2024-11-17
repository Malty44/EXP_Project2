const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  const data = {
    title: 'Home Page',
    heading: 'Welcome to the experiment',
    content: 'This is the page in which you can find all the information about the website',
    
  };

  res.render('home', data);
});



module.exports = router;