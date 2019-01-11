const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const menus = require('./routes/menus');
const deviceinit = require('./routes/deviceinit');
const orders = require('./routes/orders');
const webapp = require('./routes/webapp');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/app/menus')
});

app.use('/api/menus', menus);
app.use('/api/deviceinit', deviceinit);
app.use('/api/orders', orders);
app.use('/app', webapp);

app.set('view engine', 'ejs')
const port = process.env.PORT || 9000;
app.listen(port, () => {console.log(`on port ${port}`)})