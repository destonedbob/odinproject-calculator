// add
function add(num1, num2) {
    return num1 + num2;
}

// subtract
function subtract(num1, num2) {
    return num1 - num2;
}

// multiply
function multiply(num1, num2) {
    return num1 * num2;
}

// divide
function divide(num1, num2) {
    return num1 / num2;
}

function updateDisplay(updateNumber) {
    displayScreen.textContent = String(updateNumber);
}

function updateSubdisplay(updateText, operatorSymbol) {
    if (operatorSymbol === undefined) {
        subdisplayScreen.textContent = String(updateText);
    }
    else {
        subdisplayScreen.textContent = String(updateText) + ' ' + operatorSymbol;
    }
}

function handleNumber(event) {
    if (prevIsEqual) {
        clearAll()
    }
    let currNum = displayScreen.textContent;
    subNumber = currNum + event.target.textContent;
    updateDisplay(Number(subNumber));
    prevIsNumber = true;
    prevIsCancel = false;
    prevIsEqual = false;
}

function handleDecimal(event) {
    if (decimalUsed === false) {
        let currNum = displayScreen.textContent;
        subNumber = String(Number(currNum)) + '.';
        updateDisplay(subNumber);
        prevIsNumber = true;
        prevIsCancel = false;
        prevIsEqual = false;
    }
}

function handleOperator(event) {
    // So far these are for only if the operator is the first operator pressed
    currOperator = event.target.id
    let operatorSymbol = operatorMappingSymbol[currOperator];

    if (prevIsEqual) {
        updateSubdisplay(Number(mainNumber), operatorSymbol);
        subNumber = '0'
        updateDisplay(Number(subNumber));
    }
    else {
        if (prevIsNumber) {
            let prevOperatorFunction = operatorMappingFunction[prevOperator];

            if (isFirstOperator) {
                isFirstOperator = false;
                mainNumber = subNumber;
            }
            else {
                mainNumber = prevOperatorFunction(Number(mainNumber), Number(subNumber));
            }

            subNumber = '0'
            updateDisplay(Number(subNumber));
            prevIsNumber = false;

        }

        updateSubdisplay(Number(mainNumber), operatorSymbol);

    }
    prevOperator = currOperator;
    prevIsCancel = false;
    prevIsEqual = false;

}

function handleEqual() {
    let prevOperatorFunction = operatorMappingFunction[prevOperator];
    mainNumber = prevOperatorFunction(Number(mainNumber), Number(subNumber));
    console.log(mainNumber);
    subNumber = mainNumber;
    updateDisplay(Number(subNumber));
    updateSubdisplay('');
    prevOperator = null;
    prevIsCancel = false;
    prevIsEqual = true;

}

function handleSign() {
    if (Number(subNumber) !== 0) {
        subNumber = subNumber * -1;
        updateDisplay(Number(subNumber));
    }
}

function clearDisplay() {
    // Display holds the sub number, subdisplay holds the main number
    if (prevIsCancel) {
        clearAll();
    }
    else {
        subNumber = '0'
        updateDisplay(Number(subNumber));
        prevIsCancel = true;
    }
}

function clearAll() {
    currOperator = null;
    prevOperator = null;
    currIsNumber = null;
    isFirstOperator = true;
    mainNumber = 0;
    subNumber = '0';
    prevIsNumber = true;
    prevIsCancel = false;

    updateDisplay(0)
    updateSubdisplay('')
}

let clearButton = document.querySelector('#clear');
let clearAllButton = document.querySelector('#clearAll');
let displayScreen = document.querySelector('.display');
let subdisplayScreen = document.querySelector('.subdisplay');
let numberButtonList = document.querySelectorAll('.number');
let operatorList = document.querySelectorAll('.operator');
let equalButton = document.querySelector('#equal');
let signButton = document.querySelector('#sign');
let dotButton = document.querySelector('#decimal')

let currOperator;
let prevOperator;
let currIsNumber;
let isFirstOperator = true;
let mainNumber = 0;
let subNumber = '0';
let prevIsNumber = true;
let prevIsCancel = false;
let prevIsEqual = false;
let decimalUsed = false;


let operatorMappingSymbol = {
    'add' : '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '÷'
};
let operatorMappingFunction = {
    'add' : add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide
};

clearButton.addEventListener('click', clearDisplay);
clearAllButton.addEventListener('click', clearAll);
numberButtonList.forEach( button =>
    button.addEventListener('click', handleNumber)
);
operatorList.forEach( button => {
    button.addEventListener('click', handleOperator)
})
equalButton.addEventListener('click', handleEqual);
signButton.addEventListener('click', handleSign);
dotButton.addEventListener('click', handleDecimal);
