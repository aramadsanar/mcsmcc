const { insertMenu, validateMenu, menus } = require('../models/menu');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let menus = await getAllMenus();

    res.send(menus)
})

router.post('/', async (req, res) => {
    let newMenu = {
        menuName: req.body.menuName,
        menuType: req.body.menuType,
        menuPrice: req.body.menuPrice
    };

    newMenu.menuId = await insertMenu(
        newMenu.menuName,
        newMenu.menuType,
        newMenu.menuPrice
    );

    res.send(newMenu)
});

router.get('/:id', async (req, res) => {
    let menu = await getSingleMenu(req.params.id);

    if (!menu) res.status(404).send("Menu DNE")

    res.send(menu)
})

async function getAllMenus() {
    let cursor = await menus.get();

    var queryResult = [];
    for (menu of cursor.docs) {
        queryResult.push(menu.data())
    }

    return queryResult;
}

async function getSingleMenu(menuId) {
    let itemCursor = await menus.doc(menuId).get()
    
    if (itemCursor.exists)
        return itemCursor.data();
    else
        return null;
}

module.exports = router;