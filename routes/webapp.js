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

router.get('/cart', async(req, res) => {
    res.render('Cart')
})

router.get('/submitOrder', (req, res) => {
    res.render('SubmitOrder')
})

router.get('/viewOrder', (req, res) => {
    res.render('ViewOrder')
})
module.exports = router;