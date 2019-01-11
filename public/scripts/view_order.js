$(document).ready(loadCartItems);
let TOTAL_CART = 0;
let ORDER = null;
function loadCartItems(event) {

    let cartList = $('#menusListView');
    let order = JSON.parse(localStorage.getItem('order'))
    ORDER = order;
    if (order) {
        let items = order['menus']
        //let TOTAL_CART;
        for (let item of items) {
            loadItem(cartList, item, item['quantity']);
            TOTAL_CART += item['price'] * item['quantity'];
        }

        //insertCartTotal(cartList)
        
    }

    else {
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

function loadItem(cartList, item, quantity) {
    // let categoryName = categoryControl.attr('id');

    //this element is guaranteed to be in the categoryControl.
    // let menuCategoryTab = categoryControl.find('#menusListView');

    // console.log(categoryName)

    $.ajax(
        {
            url: 'http://127.0.0.1:9000/api/menus/' + item.menuId,
            
            //success callback accepts only one param that is result?
            //jack up the success callback and reutilize old function
            success: function(result) {
                loadItemDataToView(cartList, result, quantity);
            }
        }
    )

}

//everything down here is obvious, no explanation needed

function loadItemDataToView(cartList, result, quantity) {
    console.log(result)
    
    //let parsedResult = JSON.parse(result);
    
    // for (let menu of result) {
    cartList.append(makeMenuControls(result, quantity));
    // }

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
						<p class="card-text">Jumlah &nbsp; &nbsp; &nbsp; <button type="button" class="btn btn-outline-primary" style="padding: 1px 20px"> - </button> &nbsp; &nbsp; ${quantity} &nbsp; &nbsp; <button type="button" class="btn btn-outline-primary" style="padding: 1px 20px"> + </button></p>
						<p>Total Price Rp. ${total_price}</p></a>
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
    cartList.append(`<li data-role="list-divider">${TOTAL_CART}
    ${ORDER['name']}
    ${ORDER['tableNumber']}</li>`);
}
