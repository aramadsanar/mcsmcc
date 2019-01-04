$(document).ready(loadCartItems);
let TOTAL_CART = 0;
let ORDER = null;
function loadCartItems(event) {

    let cartList = $('#menusListView');
    let order = JSON.parse(localStorage.getItem('order'))
    ORDER = order;
    if (order) {
        let items = order['menus']

        for (let item of items) {
            loadItem(cartList, item, item['quantity']);
            TOTAL_CART += item['price'] * item['quantity'];
        }

        insertCartTotal(cartList)

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

    menuCategoryTab.listview('refresh')
}

function makeMenuControls(menu, quantity) {
    var htmlCode = `
        <li><a href="/app/menu_detail/${menu['document_id']}" target="_self">
            <img src="${menu['menu_image']}">
        <h2>${menu['menu_name']}</h2>
        <h2>${quantity}</h2>
        <p>${menu['menu_price'] * quantity}</p></a>
           
        </li>
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

function insertCartTotal(cartList) {
    cartList.append(`<li data-role="list-divider">${TOTAL_CART}
    ${ORDER['name']}
    ${ORDER['tableNumber']}</li>`);
}
