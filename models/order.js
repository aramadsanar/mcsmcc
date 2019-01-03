const db = require('../dbconnection/dbconnection');
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const {menus} = require('./menu');
const orders = db.collection('orders');


function Order(orderId, name, tableNumber, menus, totalPrice) {
    this.orderId = orderId,
    this.name = name,
    this.tableNumber = tableNumber,
    this.menus = menus,
    this.totalPrice = totalPrice,
    this.orderDelivered = false
}

async function calculateTotalPrice(expandedMenu) {
    let totalPrice = 0;
    for (item of expandedMenu) {
        totalPrice += (item.menu_price * item.quantity)
    }

    return totalPrice;
}

async function insertOrder(name, tableNumber, menus) {
    let newObjectId = ObjectId();
    let expandedMenu = await validateAndExpandMenuList(menus);
    let calculatedTotalPrice = await calculateTotalPrice(expandedMenu);

    //if (totalPrice != calculateTotalPrice) return new Error("price is tampered");

    console.log(expandedMenu)
    if (!expandedMenu) return null;
    let menuEntry = JSON.parse(
        JSON.stringify(
            new Order(newObjectId.toString(), name, tableNumber, expandedMenu, calculatedTotalPrice)
        )
    );

    let newMenuEntry = await orders.doc(newObjectId.toString()).set(menuEntry);
    
    return menuEntry;
}

async function validateMenuId(menuId) {
    const validationSchema = {
        menuId: Joi.ObjectId().required()
    }
    return Joi.validate(menuId, validationSchema);
}

async function getMenu(menuId) {
    let menuCursor = await menus.doc(menuId).get();
    let menuExists = menuCursor.exists;

    if (menuExists) return menuCursor.data();
    else return null;
}

async function validateAndExpandMenuList(menuList) {
    let expandedMenu = [];
    for (menuEntry of menuList) {
        let {error} = validateMenuId({menuId: menuEntry.menuId});
        let menu = await getMenu(menuEntry.menuId);

        if (error || !menu) return null;
        menu.quantity = menuEntry.quantity;
        expandedMenu.push(menu)
    }
    return expandedMenu;
}

function validateOrder(menu) {
    const validationSchema = {
        name: Joi.string().required(),
        tableNumber: Joi.string().required(),
        menus: Joi.array().required(),
        //totalPrice: Joi.number().min(0).required()
    };

    return Joi.validate(menu, validationSchema);
}

module.exports.Order = Order;
module.exports.insertOrder = insertOrder;
module.exports.validateOrder = validateOrder;
module.exports.orders = orders;