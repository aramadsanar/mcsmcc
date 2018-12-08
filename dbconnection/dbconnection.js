var admin = require("firebase-admin");

var serviceAccount = require(process.env.MCSMCC_KEYFILE);

//const Menu = require('./models/menu');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mccmcs-fakesolariaselforder.firebaseio.com"
});

var db = admin.firestore();

module.exports = db;
