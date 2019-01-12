$(document).ready(loadMenuIntoView)
let CURRENT_MENU_PRICE = 0;
function back() {
    window.location.replace('http://localhost:9000/app/menus');
}

let CURRENT_MENU_ID = ''
function loadMenuIntoView() {
    let menu_id = window.location.href.split('/')[5];
    CURRENT_MENU_ID = menu_id
    console.log(menu_id)
    $.ajax({
        url: 'http://127.0.0.1:9000/api/menus/' + menu_id,
        method: 'GET',
        //data, just use dict!
        success: renderCourseData
    })

    $('#addToCartButton').click((ev) => {
        let okeh = confirm("Are you sure ?");
        if (okeh == true) {
            ev.preventDefault();

            //get the order key, if there is order in localStorage, update it
            //otherwise init a new one
            let order = JSON.parse(localStorage.getItem('order'));
            let updateEntry = {
                menuId: CURRENT_MENU_ID,
                quantity: $('#orderCount').val(),
                price: CURRENT_MENU_PRICE
            };
            if (order) {
                console.log(order)
                let idxOfItemInOrder = order['menus'].findIndex(
                    (element) => {
                        return element['menuId'] == CURRENT_MENU_ID;
                    }
                )

                if (idxOfItemInOrder > -1) {
                    order['menus'][idxOfItemInOrder] = updateEntry;
                } else {
                    order['menus'].push(updateEntry);
                }

            } else {
                //create new one
                let new_order = {
                    name: '',
                    tableNumber: '',
                    menus: [],
                    orderId: '',
                    finalized: false
                }

                new_order.menus.push(updateEntry);

                order = new_order;
            }

            localStorage.setItem('order', JSON.stringify(order));
            window.location.replace('http://localhost:9000/app/viewOrder');
        }

    })
}

function renderCourseData(result) {
    // let parsedJSON = JSON.parse(result);
    let parsedJSON = result;
    let menuView = $('#menuView');
    let menuName = $('#menuName');
    let menuPrice = $('#menuPrice');
    let menuNameTittel = $('#menuNameTittle');
    // let courseDescription = $('#courseDescription');
    let menuImage = $('#menuImage');

    menuImage.attr('src', parsedJSON['menu_image'])
    menuName.html(parsedJSON['menu_name']);
    menuNameTittel.html(parsedJSON['menu_name']);
    menuPrice.html("Rp. " + parsedJSON['menu_price']);
    CURRENT_MENU_PRICE = parseInt(parsedJSON['menu_price'])

    // courseDescription.html(parsedJSON['description'])
}

function badgeCart(){
    let badge = $('#badgecart');
    let validateBadge = localStorage.getItem('order') === null ? badge.hide() : badge.show();
    return validateBadge;
}

$(document).ready(() => {
    badgeCart();
})