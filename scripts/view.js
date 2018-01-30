var $ = require('jquery'),
    cashRegister = require('./cash-register.js'),
    pw = require('./p-w.js'),
    denominations;


$(document).ready(function () {

    $formRegister = $('#form-register');
    $priceInput = $('#form-register-price');
    $cashInput = $('#form-register-cash');
    $message = $('#message');
    $btnGetSquare = $('#btn-get-square');
    $tableSquareContainer = $('#table-square-container');
    $tableSquare = $('#table-square');
    
    function refreshDenominations(){
        denominations = cashRegister.getDenominations();

        $('#table-denominations tbody').html('');
        $.each(denominations, function(index, item){
        
            $('#table-denominations tbody').append(`
                <tr>
                    <td scope="row">${item.name}</th>
                    <td>$${item.amount}</td>
                    <td>${item.qty}</td>
                </tr>
            `);
        });

        $('#table-denominations tbody').append(`
            <tr>
                <th scope="row">INITIAL BALANCE</th>
                <td></td>
                <th>$${cashRegister.initialBalance}</td>
            </tr>
        `);
    };

    function printSquare(){
        $tableSquareContainer.show();
        $formRegister.hide();
        $tableSquare.find('tbody').html(`
            <tr>
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
            </tr>
        `);
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


    /**
     * EVENTS
     */

    // Form Register (submit)
    $formRegister.submit(function(e){
        e.preventDefault();
        var response = cashRegister.calculateChangeDue($priceInput.val(), $cashInput.val());
        refreshDenominations();
        printMessage(response);
    });

    // Button Get Square (click)
    $btnGetSquare.click(function(){
        $(this).parent().hide();
        printSquare();
    });

    refreshDenominations();
    $message.fadeOut();
    $tableSquareContainer.hide();
});
