$(document).ready(loadMenus);

function loadMenus(event) {

    
    $('div', '#tabs').each(function() {
        let id = $(this).attr('id');
        
        if (id) {
            let category = $('#' + id);
            loadCategory(category)
        }
    })
}

function loadCategory(categoryControl) {
    let categoryName = categoryControl.attr('id');
    let menuCategoryTab = categoryControl.find('#menusListView');

    console.log(categoryName)

    $.ajax(
        {
            url: 'http://127.0.0.1:3000/api/menus/getByCategory/' + categoryName,				
            success: function(result) {
                loadMenusDataToView(menuCategoryTab, result);
            }
        }
    )

}


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
	<li>
		<a href="/app/menu_detail/${menu['document_id']}" target="_self">
    		<h2>${menu['menu_name']}</h2>
    		<p><h3>${menu['menu_price']}</h3></p>
    		
		</a>
    </li>`
    return htmlCode;
}

