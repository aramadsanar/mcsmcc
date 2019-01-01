const db = require('../dbconnection/dbconnection');
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');
const MENU_TABLE_NAME = 'menu';

function Menu(menu_id, menu_name, menu_category, menu_price, menu_image) {
    this.menu_id = menu_id,
    this.menu_name = menu_name,
    this.menu_category = menu_category,
    this.menu_price = menu_price,
    this.menu_image = menu_image
}

async function insertMenu(menu_name, menu_category, menu_price, menu_image) {
    let newObjectId = ObjectId();
    let menuEntry = JSON.parse(
        JSON.stringify(
            new Menu(newObjectId.toString(), menu_name, menu_category, menu_price, menu_image)
        )
    );

    let newMenuEntry = await db.collection(MENU_TABLE_NAME).doc(newObjectId.toString()).set(menuEntry);

    return newObjectId.toString();
}

function validateMenu(menu) {
    const validationSchema = {
        menu_name: Joi.string().required(),
        menu_category: Joi.string().required(),
        menu_price: Joi.number().required(),
        menu_image: Joi.string().required()
    };

    return Joi.validate(menu, validationSchema);
}

module.exports.Menu = Menu;
module.exports.insertMenu = insertMenu;
module.exports.validateMenu = validateMenu;
module.exports.menus = db.collection(MENU_TABLE_NAME)