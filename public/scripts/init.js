function buyTicket(e) {
    e.preventDefault(); //prevent default behavior jquery mobile utk bisa submit non ajax

    let name = $("#txt_name").val();
    let year = $("#txt_year").val();
    let price = $("#txt_price").val();


    console.log("Name: " + name);
    console.log("Year: " + year);
    console.log("Price: " + price);

    //storage api

    //1. key value (session dan lokal)
    //2. local database (in browser using sql)
    

    localStorage.setItem("chosen", "hahahihi")
}

$(function () { //callback/event yang akan jalan saat source sudah terload
    $("#f_buy_ticket").submit(buyTicket)    
});

$(document).fin

