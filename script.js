// select elements
const display = document.querySelector('.calculator-display');
const history = document.querySelector('.history');
const keys = document.querySelector('.calculator-keys');

// initialize variables
let currentValue = '';
let operand = '';
let historyValue = '';

// functions
function calculate() {
    const previousValue = parseFloat(historyValue);
    const currentValueFloat = parseFloat(currentValue);

    if (isNaN(previousValue) || isNaN(currentValueFloat)) {
        return;
    }

    switch (operand) {
        case '+':
            currentValue = previousValue + currentValueFloat;
            break;
        case '-':
            currentValue = previousValue - currentValueFloat;
            break;
        case '*':
            currentValue = previousValue * currentValueFloat;
            break;
        case '/':
            currentValue = previousValue / currentValueFloat;
            break;
        default:
            return;
    }

    currentValue = currentValue.toString();
    operand = '';
}

function updateDisplay() {
    display.value = currentValue;
    history.value = historyValue + ' ' + operand + ' ' + currentValue;
}

// add event listeners
keys.addEventListener('click', event => {
    const target = event.target;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('key-clear')) {
        currentValue = '0';
        operand = '';
        historyValue = '';
    } else if (target.classList.contains('key-delete')) {
        currentValue = currentValue.slice(0, -1);
        if (currentValue === '') {
            currentValue = '0';
        }
    } else if (target.classList.contains('key-sign')) {
        currentValue = (parseFloat(currentValue) * -1).toString();
    } else if (target.classList.contains('key-percent')) {
        currentValue = (parseFloat(currentValue) / 100).toString();

        // + //
    } else if (target.classList.contains('key-add')) {
        calculate();
        operand = '+';
        historyValue = historyValue + ' ' + currentValue;
        currentValue = '';
        // - //
    } else if (target.classList.contains('key-subtract')) {
        calculate();
        operand = '-';
        historyValue = historyValue + ' ' + currentValue;
        currentValue = '0';
        // * //
    } else if (target.classList.contains('key-multiply')) {
        calculate();
        operand = '*';
        historyValue = historyValue + ' ' + currentValue;
        currentValue = '';
        // / //
    } else if (target.classList.contains('key-divide')) {
        calculate();
        operand = '/';
        historyValue = historyValue + ' ' + currentValue;
        currentValue = '';
        // = //
    } else if (target.classList.contains('key-equals')) {
        calculate();
        historyValue = '';
    } else {
        if (currentValue === '0') {
            currentValue = target.textContent;
        } else {
            currentValue += target.textContent;
        }
    }

    updateDisplay();
});
