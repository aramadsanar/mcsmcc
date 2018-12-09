const { insertMenu, validateMenu, menus } = require('../models/menu');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let menus = await getAllMenus();

    return res.send(menus);
})

router.post('/', async (req, res) => {
    let newMenu = {
        menuName: req.body.menuName,
        menuType: req.body.menuType,
        menuPrice: req.body.menuPrice
    };

    const {error} = validateMenu(newMenu);

    if (error) return res.status(400).send(error.message);

    newMenu.menuId = await insertMenu(
        newMenu.menuName,
        newMenu.menuType,
        newMenu.menuPrice
    );

    return res.send(newMenu)
});

router.get('/:id', async (req, res) => {
    let menu = await getSingleMenu(req.params.id);

    if (!menu) return res.status(404).send("Menu DNE")

    return res.send(menu)
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