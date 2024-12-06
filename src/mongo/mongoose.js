const mongoose = require('mongoose');

// Define the schema for the form data
const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, default: 0 },
  gender: { type: String, required: true },
  pcUsage: { type: String, required: true },
  visualImpairment: { type: String, required: true },
  videoG: { type: String, required: true },
  sports: { type: String, required: true },
  additionalInfo: { type: String, default: '' }
});

// Create a Mongoose model based on the schema
const FormModel = mongoose.model('Form', formSchema, 'EXP2');

// Export the model so it can be used in other files
module.exports = FormModel;
