const db = require('../dbconnection/dbconnection');
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const {menus} = require('./menu');

function Order(name, tableNumber, menus, totalPrice) {
    this.name = name,
    this.tableNumber = tableNumber,
    this.menus = menus,
    this.totalPrice = totalPrice
}

async function insertOrder(name, tableNumber, menus, totalPrice) {
    let newObjectId = ObjectId();
    let isMenuValid = validateMenuList(menus);

    if (!isMenuValid) return null;
    let menuEntry = JSON.parse(
        JSON.stringify(
            new Order(name, tableNumber, menus, totalPrice)
        )
    );

    let newMenuEntry = await db.collection('menus').doc(newObjectId.toString()).set(menuEntry);
    
}

async function validateMenuId(menuId) {
    const validationSchema = {
        menuId: Joi.ObjectId().required()
    }
    return Joi.validate(menuId, validationSchema);
}

async function checkMenuExistence(menuId) {
    let menuCursor = await menus.doc(menuId.menuId).get();
    let menuExists = menuCursor.exists;

    return menuExists;
}
async function validateMenuList(menuList) {
    for (menuId of menuList) {
        let {error} = validateMenuId({menuId: menuId});

        let menuExists = await checkMenuExistence(menuId);
        if (error || !menuExists) return false;
    }
}

function validateOrder(menu) {
    const validationSchema = {
        name: Joi.string().required(),
        tableNumber: Joi.string().required(),
        menus: Joi.array().minlength(1).required(),
        totalPrice: Joi.number().required()
    };

    return Joi.validate(menu, validationSchema);
}

module.exports.Order = Order;
module.exports.insertOrder = insertOrder;
module.exports.validateOrder = validateOrder;