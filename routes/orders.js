const { insertOrder, validateOrder, orders } = require('../models/order');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    let orders = await getAllOrders();

    res.send(orders);
})

router.get('/:id', async(req, res) => {
    //const {error} = validateOrder(req.params.id)
    //if (error) return res.status(400).send(error.message);

    let order = await getSingleOrder(req.params.id);
    if (!order) return res.status(404).send('order DNE');

    return res.send(order);
})

router.post('/', async(req, res) => {
    const {error} = validateOrder(req.body);
    if (error) return res.status(400).send(error.message);

    const {name, tableNumber, menus} = req.body;
    let newOrder = await insertOrder(name, tableNumber, menus);

    if (!newOrder) return res.status(400).send('invalid menu inserted')

    return res.send(newOrder);
})

router.put('/updateDeliveryStatus/:id', async(req, res) => {
    let newDeliveryStatus = req.body.newDeliveryStatus;
    let o = {newDeliveryStatus: newDeliveryStatus};

    let order = await getSingleOrder(req.params.id);
    
    if (!order) return res.status(404).send('order DNE')
    order.update(o);

    return res.send(order)
})

async function getAllOrders() {
    let cursor = await orders.get();

    var queryResult = [];
    for (menu of cursor.docs) {
        queryResult.push(menu.data())
    }

    return queryResult;
}

async function getSingleOrder(menuId) {
    let itemCursor = await orders.doc(menuId).get()
    
    if (itemCursor.exists)
        return itemCursor.data();
    else
        return null;
}

module.exports = router;