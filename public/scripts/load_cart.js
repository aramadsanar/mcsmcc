$(document).ready(loadCartItems);
let TOTAL_CART = 0;
function loadCartItems(event) {

    let cartList = $('#menusListView');
    let order = JSON.parse(localStorage.getItem('order'))

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
            url: 'http://35.240.245.237:3000/api/menus/' + item.menuId,

            //success callback accepts only one param that is result?
            //jack up the success callback and reutilize old function
            success: function (result) {
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
    var htmlCode = `

    <div class="card" style="margin: 10px">
					<img class="card-img-top" src="${menu['menu_image']}">
					<div class="card-body">
						<h3 class="card-title">${menu['menu_name']}</h3>
						<h5 class="card-text">Jumlah ${quantity}</h5>
						<p>Total Price ${menu['menu_price'] * quantity}</p></a>
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

function insertCartTotal(cartList) {
    cartList.append(`<li data-role="list-divider">${TOTAL_CART}</li>`);
}
