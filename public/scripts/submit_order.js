$(document).ready(() => {
    $('#submitOrder').click(makeOrder)
})

function makeOrder() {
    getNameAndTableNumber();
    submitPostOrder();
}

function getNameAndTableNumber() {
    let name = $('#name').val();
    let tableNumber = $('#tableNumber').val();

    if (name == "" && tableNumber == ""){
        alert("Empty")
    }else{
        let order = JSON.parse(
        localStorage.getItem('order')
    )

    order['name'] = name;
    order['tableNumber'] = tableNumber;

    localStorage.setItem('order', JSON.stringify(order));
    }
}


function submitPostOrder() {
    let order = localStorage.getItem('order');


    $.ajax({
        type: "POST",
        url: 'http://35.240.245.237:3000/api/orders',
        data: JSON.stringify(JSON.parse(order)),
        success: notifyOrderSubmissionSuccess,
        dataType: "json",
        contentType: "application/json",
        processData: false
      });
    // }
    // $.ajax({
    //     url: 'http://127.0.0.1:9000/api/orders',
    //     method: 'POST',
    //     dataType: "json",
    //     data: JSON.stringify(JSON.parse(order)),
    //     success: notifyOrderSubmissionSuccess
    // })
}



function notifyOrderSubmissionSuccess() {
    localStorage.removeItem('order')
    alert('Your order has been submitted')
    window.location.href = 'http://35.240.245.237:3000/app/menus'
}

function goHome(){
    window.location.replace('http://35.240.245.237:3000/app/menus')
}