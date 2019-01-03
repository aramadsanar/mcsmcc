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


    let order = JSON.parse(
        localStorage.getItem('order')
    )

    order['name'] = name;
    order['tableNumber'] = tableNumber;

    localStorage.setItem('order', JSON.stringify(order));
}


function submitPostOrder() {
    let order = localStorage.getItem('order');

    $.ajax({
        url: 'http://127.0.0.1:9000/api/orders',
        method: 'POST',
        //data, just use dict!
        data: order,
        success: notifyOrderSubmissionSuccess
    })
}



function notifyOrderSubmissionSuccess() {
    alert('Your order has been submitted')
}