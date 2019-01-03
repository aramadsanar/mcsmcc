$(document).ready(loadMenus);

function loadMenus(event) {

    //for each tabs, load the category data
    $('div', '#tabs').each(function() {
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
            url: 'http://127.0.0.1:9000/api/menus/getByCategory/' + categoryName,
            
            //success callback accepts only one param that is result?
            //jack up the success callback and reutilize old function
            success: function(result) {
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

    menuCategoryTab.listview('refresh')
}

function makeMenuControls(menu) {
    var htmlCode = `
        <li><a href="/app/menu_detail/${menu['document_id']}" target="_self">
            <img src="${menu['menu_image']}">
        <h2>${menu['menu_name']}</h2>
        <p>${menu['menu_price']}</p></a>
            <a href="/app/menu_detail/${menu['document_id']}" target="_self" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
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

