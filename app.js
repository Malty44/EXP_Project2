const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src', 'styles')));
app.use(express.static('src'));
const mainRouter = require(path.join(__dirname, 'src', 'routes', 'router.js'));
const formRouter = require(path.join(__dirname, 'src', 'routes', 'formRoute.js'));
app.use('/', mainRouter);
app.use('/form', formRouter);
app.use('/favicon.ico', express.static(path.join(__dirname, 'src', 'favicon.ico')));



mongoose.connect('mongodb+srv://main:Youtube44@formsubmissionexp2.goagw.mongodb.net/?retryWrites=true&w=majority&appName=formSubmissionEXP2')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use((req, res) => {
  res.status(404).send('Page not found');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
