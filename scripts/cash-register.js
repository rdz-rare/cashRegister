/**
 * CASH REGISTER
 */

var cashRegister = (function () {


    var denominations = [
        {
            name: 'PENNY',
            amount: 0.01,
            qty: 5
        },
        {
            name: 'NICKEL',
            amount: 0.05,
            qty: 5
        },
        {
            name: 'DIME',
            amount: 0.10,
            qty: 5
        },
        {
            name: 'QUARTER',
            amount: 0.25,
            qty: 5
        },
        {
            name: 'ONE',
            amount: 1,
            qty: 5
        },
        {
            name: 'FIVE',
            amount: 5,
            qty: 5
        },
        {
            name: 'TEN',
            amount: 10,
            qty: 5
        },
        {
            name: 'TWENTY',
            amount: 20,
            qty: 5
        },
        {
            name: 'ONE HUNDRED',
            amount: 100,
            qty: 5
        }
    ];

    var initialBalance = getTotalCashFlow();
    var totalSales = 0;


    // Calculate the change due
    function calculateChangeDue(price, cash) {
        price = Number(price);
        cash = Number(cash);
        var _totalCashFlow = getTotalCashFlow(),
            _remainer = parseFloat(cash - price).toFixed(2);

        console.log(_totalCashFlow)
        console.log('remainer', _remainer);
        console.log('price', price, 'cash', cash);
        // If the price es greater than the total cash flow or the prices is greater the cash then return: Insufficient Funds
        if (price > _totalCashFlow) {
            return {message: 'Insufficient Funds', success: false };

        } else if (price > cash) {
            return { message: 'Not enough cash', success: false}
            // If the price is equal to cash then return 0 remainer;
        } else if (price == cash) {
            addSale(price);
            return { message: 'Your change: ' + _remainer, success: true};

            // Process the remainer money
        } else {

           if(testChangeDue(_remainer, price) == 0){
               return { message: 'Your change: $' + _remainer, success: true };
           }else{
               return { message: 'Insufficient Funds', success: false };
           }

        }
    }

    var testChangeDue = function (remainer, price) {
        var _remainerValue = remainer;
        var _tempDenominations = denominations.slice(0).reverse();

        for (var i = 0; i < _tempDenominations.length; i++) {

            if (_tempDenominations[i].qty > 0 && _remainerValue >= 0.01) {
                if ((_remainerValue % _tempDenominations[i].amount) !== _remainerValue) {
                    if (Math.floor(_remainerValue / _tempDenominations[i].amount) >= 0 && Math.floor(_remainerValue / _tempDenominations[i].amount) <= _tempDenominations[i].qty) {
                        _tempDenominations[i].qty = _tempDenominations[i].qty - Math.floor(_remainerValue / _tempDenominations[i].amount);
                        _remainerValue = parseFloat(_remainerValue % _tempDenominations[i].amount).toFixed(2);
                    }
                }
            }
        }

        if (_remainerValue == 0) {
            denominations = _tempDenominations.reverse();
            addSale(price);
        }
        return _remainerValue;
    }

    // Get the total cash in the register counter
    function getTotalCashFlow() {
        var _total = 0;
        for (var i = 0; i < denominations.length; i++) {
            // console.log('getTotalCashFlow', denominations[i].amount * denominations[i].qty);
            _total += (denominations[i].amount * denominations[i].qty);
        }
        return _total;
    };

    var addSale = function(cash) {
       totalSales += cash;
       console.log('sales:', totalSales);
       return totalSales;
    }

    function getSquare(){
        return parseFloat(totalSales + initialBalance).toFixed(2);
    }

    function getSales(){
        return totalSales;
    }


    // Get Denominations
    function getDenominations() {
        return denominations;
    }

    // Validate Change
    var validateChange = function () {

    }

    return {
        initialBalance: initialBalance,
        getTotalCashFlow: getTotalCashFlow,
        getSales: getSales,
        getSquare: getSquare,
        getDenominations: getDenominations,
        calculateChangeDue: calculateChangeDue
    }
})();

module.exports = cashRegister;