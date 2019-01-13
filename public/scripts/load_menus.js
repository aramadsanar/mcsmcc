$(document).ready(loadMenus);

function loadMenus(event) {

    //for each tabs, load the category data
    $('div', '#myTab').each(function () {
        let id = $(this).attr('id');

        if (id) {
            //neat jquery DOM tree traversal trick
            let category = $('#' + id);
            loadCategory(category)
        }
    })
}

function loadCategory(categoryControl) {
    let categoryName = categoryControl.attr('id');

    //this element is guaranteed to be in the categoryControl.
    let menuCategoryTab = categoryControl.find('#menusListView');

    console.log(categoryName)

    $.ajax(
        {
            url: 'http://35.240.245.237:3000/api/menus/getByCategory/' + categoryName,
            //success callback accepts only one param that is result?
            //jack up the success callback and reutilize old function
            success: function (result) {
                loadMenusDataToView(menuCategoryTab, result);
            }
        }
    )

}

//everything down here is obvious, no explanation needed

function loadMenusDataToView(menuCategoryTab, result) {
    console.log(result)
    //let parsedResult = JSON.parse(result);

    for (let menu of result) {
        menuCategoryTab.append(makeMenuControls(menu));
    }
}

function makeMenuControls(menu) {
    var htmlCode = `
    <div class="card col-md" style="margin-bottom: 10px">
    <a href="/app/menu_detail/${menu['document_id']}" target="_self">
        <img class="card-img-top" src="${menu['menu_image']}">
        <div class="card-body">
            <h3 class="card-title">${menu['menu_name']}</h3>
            <h5 class="card-text">Rp. ${menu['menu_price']}</h5>
            <a href="/app/menu_detail/${menu['document_id']}" target="_self" data-rel="popup" data-position-to="window" data-transition="pop" class="btn amado-btn margtop">Purchase</a>
        </div>
    </a>
</div>
    `

    return htmlCode;
}

function akuLoad() {
    $.ajax({
        url: 'http://35.240.245.237:3000/api/menus',
        success: function (result) {
            //loadMenusDataToView(menuCategoryTab, result);
            //makeMenuControls(result);
            console.log(result);
            for (let menu of result) {
                var htmlCode = `
		<div class="card" style="margin: 10px">
			<a href="/app/menu_detail/${menu['document_id']}" target="_self">
				<img class="card-img-top" src="${menu['menu_image']}">
				<div class="card-body">
					<h2 class="card-title">${menu['menu_name']}</h2>
					<h5 class="card-text">Rp. ${menu['menu_price']}</h5>
					<a href="/app/menu_detail/${menu['document_id']}" target="_self" data-rel="popup" data-position-to="window" data-transition="pop" class="btn amado-btn margtop">Purchase</a>
				</div>
			</a>
		</div>
                `
                $('#menusListView').append(htmlCode);
            }

        }
    }
    )
}

function badgeCart(){
    let badge = $('#badgecart');
    let validateBadge = localStorage.getItem('order') === null ? badge.hide() : badge.show();
    return validateBadge;
}

$(document).ready(() => {
    badgeCart();
})