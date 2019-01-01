const { menus } = require('../models/menu');
const { Order, insertOrder, orders } = require('../models/order');
const express = require('express');
const router = express.Router();
router.use(express.static('public'))
router.get('/menus', async(req, res) => {
    res.render('ViewMenus')
})

router.get('/menu_detail/:menu_id', async(req, res) => {
    res.render('MenuDetail');
})

module.exports = router;