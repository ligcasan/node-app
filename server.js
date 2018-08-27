const express = require('express');
const mustacheExpress = require('mustache-express');
require('dotenv').config();

const app = express();

const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.get('/populate_images', (req, res) => {
  res.render('populate_images');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}.`);
});
