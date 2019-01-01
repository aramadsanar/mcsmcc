const { insertMenu, validateMenu, menus } = require('../models/menu');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let menus = await getAllMenus();

    return res.send(menus);
})

router.post('/', async (req, res) => {
    let newMenu = {
        menu_name: req.body.menu_name,
        menu_category: req.body.menu_category,
        menu_price: req.body.menu_price,
        menu_image: req.body.menu_image
    };

    const {error} = validateMenu(newMenu);

    if (error) return res.status(400).send(error.message);

    newMenu.menu_id = await insertMenu(
        newMenu.menu_name,
        newMenu.menu_category,
        newMenu.menu_price,
        newMenu.menu_image
    );

    return res.send(newMenu)
});

router.get('/getByCategory/:menu_category', async (req, res) => {
    let menus = await getMenuByCategory(req.params.menu_category);

    //if (!menus) return res.status(404).send("Menu DNE")

    return res.send(menus)
})


router.get('/:id', async (req, res) => {
    let menu = await getSingleMenu(req.params.id);

    if (!menu) return res.status(404).send("Menu DNE")

    return res.send(menu)
})

async function getAllMenus() {
    let cursor = await menus.get();

    var queryResult = [];
    for (menuDocument of cursor.docs) {
        let menu = menuDocument.data();
        menu['document_id'] = menuDocument.id;
        console.log(menu)
        queryResult.push(menu)
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


async function getMenuByCategory(menu_category) {
    let cursor = await menus.where('menu_category', '==', menu_category).get();
    //console.log(cursor.docs)
    var queryResult = [];
    for (menuDocument of cursor.docs) {
        let menu = menuDocument.data();
        menu['document_id'] = menuDocument.id;
        console.log(menu)
        queryResult.push(menu)
    }

    return queryResult;
}

module.exports = router;