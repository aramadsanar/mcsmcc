
const db = require('./dbconnection/dbconnection');
const {Menu, insertMenu} = require('./models/menu');


let menuEntry = JSON.parse(
    JSON.stringify(
        new Menu("ayam ganja", "masakan mabok", 50000)
    )
);
insertMenu("haha", "ihi", 5000)