const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  console.log('Root route accessed');
  const data = {
    title: 'Home Page',
    heading: 'Welcome to the experiment',
    content: 'This is the page in which you can find all the information about the website',
    
  };

  res.render('home', data);
});

router.get('/form', (req, res) => {
  res.render('form');
});

router.post('/submit_form', (req, res) => {

const formData = {
  full_name: req.body.full_name,
  age: req.body.age || 0,
  
  // Gender processing
  gender: req.body.gender, // Will be 'male', 'female', or 'prefer_not_to_say'
  
  // PC Usage
  pc_usage: req.body.pc_usage, // Will be 'yes' or 'no'
  
  // Other binary fields
  visual: req.body.visual,
  videoG: req.body.videoG,
  sports: req.body.sports,
  
  additional_info: req.body.additional_info || ''
};
  console.log('Processed Form Data:', JSON.stringify(formData));
    try {
      // const newFormEntry = new FormModel({
      //     fullName: full_name,
      //     age: age,
      //     gender: gender,
      //     pcUsage: pc_usage,
      //     visualImpairment: visual,
      //     additionalInfo: additional_info
      // });
      // await newFormEntry.save();
  
      // Redirect after processing
      res.redirect('/');
  } catch (error) {
      // Handle any errors
      console.error('Form submission error:', error);
      res.status(500).send('Error submitting form');
  }
});

module.exports = router;