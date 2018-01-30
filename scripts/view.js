var $ = require('jquery'),
    cashRegister = require('./cash-register.js'),
    pw = require('./p-w.js'),
    denominations;


$(document).ready(function () {

    // Cash Register
    $formRegister = $('#form-register');
    $priceInput = $('#form-register-price');
    $cashInput = $('#form-register-cash');
    $message = $('#message');
    $btnGetSquare = $('#btn-get-square');
    $tableSquareContainer = $('#table-square-container');
    $tableSquare = $('#table-square');
    // PairWise
    $pwForm = $('#form-pw');
    $pwArrInput = $('#input-pw-arr');
    $pwArgInput = $('#input-pw-arg');
    $pwRespElem = $('#pw-response');


    function refreshDenominations() {
        denominations = cashRegister.getDenominations();

        $('#table-denominations tbody').html('');
        $.each(denominations, function (index, item) {

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

    function printSquare() {
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

    function printMessage(message) {
        $message.hide();

        if (message.success) {
            $message.addClass('alert-success').removeClass('alert-warning').hide().fadeIn()
                .html(`
                <strong>Closed</strong> 
                ${message.message}
            `);
        } else {
            $message.addClass('alert-warning').removeClass('alert-success').hide().fadeIn().html(message.message);
        }
    }

    /**
     * EVENTS
     */

    // Form Register (submit)
    $formRegister.submit(function (e) {
        e.preventDefault();
        var response = cashRegister.calculateChangeDue($priceInput.val(), $cashInput.val());
        refreshDenominations();
        printMessage(response);
    });

    // Button Get Square (click)
    $btnGetSquare.click(function () {
        $(this).parent().hide();
        printSquare();
    });

    $pwForm.submit(function (e) {
        e.preventDefault();
        var sum = pw($pwArrInput.val(), $pwArgInput.val());
        $pwRespElem.hide().text(sum).fadeIn();
    })

    refreshDenominations();
    $message.hide();
    $pwRespElem.hide();
    $tableSquareContainer.hide();
});
