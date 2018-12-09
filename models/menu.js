const db = require('../dbconnection/dbconnection');
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');

function Menu(menuId, menuName, type, price) {
    this.menuId = menuId,
    this.menuName = menuName,
    this.menuType = type,
    this.menuPrice = price
}

async function insertMenu(menuName, menuType, menuPrice) {
    let newObjectId = ObjectId();
    let menuEntry = JSON.parse(
        JSON.stringify(
            new Menu(newObjectId.toString(), menuName, menuType, menuPrice)
        )
    );

    let newMenuEntry = await db.collection('menus').doc(newObjectId.toString()).set(menuEntry);

    return newObjectId.toString();
}

function validateMenu(menu) {
    const validationSchema = {
        name: Joi.string().required(),
        menuType: Joi.string().required(),
        menuPrice: Joi.string().required()
    };

    return Joi.validate(menu, validationSchema);
}

module.exports.Menu = Menu;
module.exports.insertMenu = insertMenu;
module.exports.validateMenu = validateMenu;
module.exports.menus = db.collection('menus')