const express = require('express');
const FormModel = require('../mongo/mongoose'); 
const router = express.Router();

router.post('/submit_form', async (req, res) => {
  const { full_name, age, gender, pc_usage, visual, videoG, sports, additional_info } = req.body;

  // Validate that required fields are filled out
  if (!full_name || !gender || !pc_usage || !visual || !videoG || !sports) {
      return res.status(400).send('Please complete all required fields.');
  }

  try {
      const newFormEntry = new FormModel({
          fullName: full_name,
          age: age || 0,
          gender,
          pcUsage: pc_usage,
          visualImpairment: visual,
          videoG,
          sports,
          additionalInfo: additional_info || ''
      });

      // Save the form data to the database
      await newFormEntry.save();
      console.log('Form data saved:', newFormEntry);

      // Redirect to quiz page with user's name
      const redirectUrl = `/exp?name=${encodeURIComponent(newFormEntry.fullName)}`;
      res.redirect(redirectUrl);

  } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).send('Error submitting form');
  }
});

module.exports = router;