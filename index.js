const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const menus = require('./routes/menus');
const deviceinit = require('./routes/deviceinit');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/menus', menus);
app.use('/api/deviceinit', deviceinit);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`on port ${port}`)})