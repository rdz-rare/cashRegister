var $ = require('jquery');
var cashRegister = require('./cash-register.js');

var denominations;

// console.log('total: ' + cashRegister.getTotalCashFlow());
// console.log('totalCash: ' + cashRegister.getTotalCashFlow());
// console.log('calculateChangeDue: ' + message.message);
// var message = cashRegister.calculateChangeDue(24.25, 30)


$(document).ready(function () {

    console.log('denominations', denominations);
    
    $formRegister = $('#form-register');
    $priceInput = $('#form-register-price');
    $cashInput = $('#form-register-cash');
    $message = $('#message');
    console.log('$$priceInput', $priceInput.val());
    
    
    function refreshDenominations(){
        denominations = cashRegister.getDenominations();
        printSquare();

        $('#table-denominations tbody').html('');
        $.each(denominations, function(index, item){
        
            $('#table-denominations tbody').append(`
                <tr>
                    <td scope="row">${item.name}</th>
                    <td>$${item.amount}</td>
                    <td>${item.qty}</td>
                </tr>
            `);
        })

        $('#table-denominations tbody').append(`
                <tr>
                    <th scope="row">INITIAL BALANCE</th>
                    <td></td>
                    <th>$${cashRegister.initialBalance}</td>
                </tr>
            `);

    };

    function printSquare(){
        $('#table-square tbody').html(
        `<tr>
            <td>Initial Balance</td>
            <td>$${cashRegister.initialBalance}</td>
        </tr>
        <tr>
            <td>Sold</td>
            <td>$${cashRegister.getSales()}</td>
        </tr>
        <tr>
            <th>Total Amount</td>
            <th>$${cashRegister.getSquare()}</td>
        </tr>`
        );
    }

    function printMessage(message){
        $message.hide();

        if (message.success){
            $message.addClass('alert-success').removeClass('alert-warning').fadeIn().html(`
                <strong>Closed</strong> 
                ${message.message}
            `);
            setTimeout(function(){
                $message.fadeOut();
            },3000)
        }else{
            $message.addClass('alert-warning').removeClass('alert-success').fadeIn().html(message.message);
            setTimeout(function () {
                $message.fadeOut();
            }, 3000)
        }
    }
    
    $formRegister.submit(function(e){
        e.preventDefault();
        var response = cashRegister.calculateChangeDue($priceInput.val(), $cashInput.val());
        refreshDenominations();
        printMessage(response);
        console.log('messages---', response.message);
        // alert(message.message);
    })

    refreshDenominations();
    $message.fadeOut();
});
