$(document).ready(loadCartItems);
let TOTAL_CART = 0;
let ORDER = null;
function loadCartItems(event) {

    let cartList = $('#menuItemsListView');
    let order = JSON.parse(localStorage.getItem('order'))
    ORDER = order;
    if (order) {
        // let items = order['menus']
        //let TOTAL_CART;
        $('#card_me').show();
        drawCartList(cartList, order['menus'])
    }

    else {
        $('#card_me').hide();
        cartList.append('Your cart is empty!')
    }
    // //for each tabs, load the category data
    // $('div', '#tabs').each(function() {
    //     let id = $(this).attr('id');
        
    //     if (id) {
    //         //neat jquery DOM tree traversal trick
    //         let category = $('#' + id);
    //         loadCategory(category)
    //     }
    // })
}

async function drawCartList(cartList, items) {
    cartList.html('')
    for (let i=0; i < items.length; i++) {
        loadItem(cartList, items[i], items[i]['quantity'], i);
        TOTAL_CART += items[i]['price'] * items[i]['quantity'];
    }

    TOTAL_CART = updateTotalPrice()
    // insertCartTotal(cartList)

}

function loadItem(cartList, item, quantity, index) {
    // let categoryName = categoryControl.attr('id');

    //this element is guaranteed to be in the categoryControl.
    // let menuCategoryTab = categoryControl.find('#menusListView');

    // console.log(categoryName)

    $.ajax(
        {
            url: 'http://35.240.245.237:3000/api/menus/' + item.menuId,
            
            //success callback accepts only one param that is result?
            //jack up the success callback and reutilize old function
            success: function(result) {
                loadItemDataToView(cartList, result, quantity, index);
            }
        }
    )

}
//this is in dire need of refactoring.
function incrementOrderQuantity(index, quantityLabelTextViewId, itemTotalPriceLabelTextViewId, incrementBy) {
    let currentOrder = JSON.parse(JSON.stringify(ORDER));

    let currentQuantity = parseInt(currentOrder['menus'][index]['quantity'], 10)
    
    //update the quantity first
    let newQuantity = (currentQuantity += incrementBy);
    currentOrder['menus'][index]['quantity'] = newQuantity;

    //update accordingly
    if (newQuantity > 0) {
        $(quantityLabelTextViewId).html(`&nbsp; &nbsp; ${newQuantity} &nbsp; &nbsp;`);
        $(itemTotalPriceLabelTextViewId).html(`Total Price Rp. ${newQuantity * ORDER['menus'][index]['price']}`)
    }
 
    
    else {
        currentOrder['menus'] = currentOrder['menus'].filter((v, idx, arr) => {
            return idx != index;
        });
        
        drawCartList($('#menuItemsListView'), currentOrder['menus'])
    }

    //commit it to the local storage
    localStorage.setItem('order', JSON.stringify(currentOrder));
    ORDER = JSON.parse(JSON.stringify(currentOrder));
    updateTotalPrice();
    
    return currentQuantity;
}

async function updateQuantityAndItemTotalPriceLabel(index, quantityLabelTextViewId, itemTotalPriceLabelTextViewId, newQuantity) {
    $(quantityLabelTextViewId).html(`&nbsp; &nbsp; ${newQuantity} &nbsp; &nbsp;`);
    $(itemTotalPriceLabelTextViewId).html(`Total Price Rp. ${newQuantity * ORDER['menus'][index]['price']}`)

    updateTotalPrice()
}

async function updateTotalPrice() {
    let items = ORDER['menus']
    //let TOTAL_CART;
    TOTAL_CART = 0;
    for (let i=0; i < items.length; i++) {
        // loadItem(cartList, items[i], items[i]['quantity'], i);
        TOTAL_CART += parseInt(items[i]['price'], 10) * parseInt(items[i]['quantity'], 10);
    }

    insertCartTotal(undefined)
}
//everything down here is obvious, no explanation needed

function loadItemDataToView(cartList, result, quantity, index) {
    console.log(result)
    
    //let parsedResult = JSON.parse(result);
    
    // for (let menu of result) {
    cartList.append(makeMenuControls(result, quantity));
    // }
    let minusButtonId = `#minusButton${result['menu_id'] + quantity}`
    let plusButtonId = `#addButton${result['menu_id'] + quantity}`
    let quantityTextView = `#quantity${result['menu_id'] + quantity}`
    let totalPriceTextView = `#totalPrice${result['menu_id'] + quantity}`

    $(minusButtonId).click(async () => {
        let quantityLabelTextViewId = quantityTextView;
        let totalPriceTextViewId = totalPriceTextView;

        incrementOrderQuantity(index, quantityLabelTextViewId, totalPriceTextViewId, -1)


        // updateQuantityAndItemTotalPriceLabel(index, quantityLabelTextViewId, totalPriceTextViewId, newQuantity);
    })


    $(plusButtonId).click(async () => {
        // let newQuantity = incrementOrderQuantity(index, 1)
        // let quantityLabelTextViewId = quantityTextViewId;
        // let totalPriceTextViewId = totalPriceTextView;

        // updateQuantityAndItemTotalPriceLabel(index, quantityLabelTextViewId, totalPriceTextViewId, newQuantity);
    
        let quantityLabelTextViewId = quantityTextView;
        let totalPriceTextViewId = totalPriceTextView;

        incrementOrderQuantity(index, quantityLabelTextViewId, totalPriceTextViewId, 1)
    })
    //menuCategoryTab.listview('refresh')
}

function makeMenuControls(menu, quantity) {
    var total_price = menu['menu_price'] * quantity;
    var htmlCode = `
    <div class="card" style="margin-top: 20px">
        <img class="card-img-top" src="${menu['menu_image']}">
        <div class="card-body">
            <h3 class="card-title">${menu['menu_name']}</h3>
            <h5 class="card-text">Rp. ${menu['menu_price']}</h5>
                <p class="card-text">
                    Jumlah &nbsp; &nbsp; &nbsp; 
                    <button type="button" class="btn btn-outline-primary" style="padding: 1px 20px" id="minusButton${menu['menu_id'] + quantity}"> - </button> 
                        <span id="quantity${menu['menu_id'] + quantity}">&nbsp; &nbsp; ${quantity} &nbsp; &nbsp;</span> 
                    <button type="button" class="btn btn-outline-primary" style="padding: 1px 20px" id="addButton${menu['menu_id'] + quantity}"> + </button>
                </p>
            <p id="totalPrice${menu['menu_id'] + quantity}">Total Price Rp. ${total_price}</p></a>
        </div>
	</div>
    `

    
    
	// var htmlCode = `
	// <li>
	// 	<a href=">
    // 		<h2></h2>
    // 		<p><h3></h3></p>
    		
	// 	</a>
    // </li>`
    return htmlCode;
}

function printTotal(total){
    console.log("ini total "+total)
    //cartList.append(`<li data-role="list-divider">${total}`);
}

function insertCartTotal(cartList) {
    console.log(TOTAL_CART)
    // cartList.append(`<li data-role="list-divider">${TOTAL_CART}
    // ${ORDER['name']}
    // ${ORDER['tableNumber']}</li>`);

    $('#totalPrice').html('Rp. ' + TOTAL_CART)
}

function onProcess(){
    window.location.href='http://35.240.245.237:3000/app/submitOrder';
}

function badgeCart(){
    let badge = $('#badgecart');
    let validateBadge = localStorage.getItem('order') === null ? badge.hide() : badge.show();
    return validateBadge;
}

$(document).ready(() => {
    badgeCart();
})