const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: 'https://exp-project2.onrender.com', // Replace with your allowed origin
  credentials: true
}));

// Optional additional preflight handler
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src', 'styles')));
app.use(express.static('src'));
const mainRouter = require(path.join(__dirname, 'src', 'routes', 'router.js'));
app.use('/', mainRouter);
app.use('/favicon.ico', express.static(path.join(__dirname, 'src', 'favicon.ico')));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
