const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    return res.send(mongoose.Types.ObjectId().toString());
})

module.exports = router;
