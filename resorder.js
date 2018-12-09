const {orders, insertOrder, Order} = require('./models/order');

async function cobamasukinmenu() {
    let name = 'adrian';
    let tableNumber = '444';
    let menus = [
        {
            menuId: '5c0c8b6a313342280f375305',
            quantity: 10
        },
        {
            menuId: '5c0c9a705a602738eb160b29',
            quantity: 11
        }
    ];
    let totalPrice = (4620000 + 50000);


    let newOrderId = await insertOrder(name, tableNumber, menus, totalPrice);
    console.log(newOrderId)
}

cobamasukinmenu()