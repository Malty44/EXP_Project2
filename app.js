const express = require('express');

const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src', 'styles')));
app.use(express.static('src'));
const mainRouter = require(path.join(__dirname, 'src', 'routes', 'router.js'));
app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
