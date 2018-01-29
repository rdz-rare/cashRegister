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

        $('#table-denominations tbody').html('');
        $.each(denominations, function(index, item){
        
            $('#table-denominations tbody').append(`
                <tr>
                    <th scope="row">${item.name}</th>
                    <td>$${item.amount}</td>
                    <td>${item.qty}</td>
                </tr>
            `);
        })

        $('#table-denominations tbody').append(`
                <tr>
                    <th scope="row">INITIAL BALANCE</th>
                    <td></td>
                    <td>${cashRegister.initialBalance}</td>
                </tr>
            `);

    };

    function printMessage(message){
        if (message.success){
            console.log('message 1', message);
            $message.addClass('alert-success').removeClass('alert-warning').text(message.message).show();
        }else{
            console.log('message 2', message);
            $message.addClass('alert-warning').removeClass('alert-success').text(message.message).show();
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
    $message.hide();
});
