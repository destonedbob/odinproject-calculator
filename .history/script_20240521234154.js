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
    if (operatorSymbol == null) {
        subdisplayScreen.textContent = String(updateText);
    }
    else {
        subdisplayScreen.textContent = String(updateText) + ' ' + operatorSymbol;
    }
}

function handleNumber(event) {
    let currNum = displayScreen.textContent;
    subNumber = currNum + event.target.textContent;
    updateDisplay(Number(subNumber));
    prevIsNumber = true;
    prevIsCancel = false;
}

function handleOperator(event) {
    // So far these are for only if the operator is the first operator pressed
    currOperator = event.target.id
    let operatorSymbol = operatorMappingSymbol[currOperator];

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

    prevOperator = currOperator;
    prevIsCancel = false;


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
let equalButton = document.querySelectorAll('#equal');

let currOperator;
let prevOperator;
let currIsNumber;
let isFirstOperator = true;
let mainNumber = 0;
let subNumber = '0';
let prevIsNumber = true;
let prevIsCancel = false;
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





// let firstNum;

// let secondNum;

// function operate(operator, num1, num2) {
//     return operatorMapping[operator](num1, num2);
// }

// // function for clearing display
// function clearDisplay() {
//     displayText = '';
//     displayScreen.textContent = displayText;
//     pointUsed = false;
// }

// function clearSubdisplay() {
//     subdisplayText = '';
//     subdisplayScreen.textContent = subdisplayText;
// }

// function clearAllDisplay() {
//     clearSubdisplay();
//     clearDisplay();
// }

// // function to update display
// function updateDisplay(element) {

//     console.log(pointUsed)

//     let buttonPressText = element.textContent;

//     if ((pointUsed) & (buttonPressText === '.')) {
//         return;
//     } else if ((displayText[displayText.length - 1] === '.') &
//                (buttonPressText === '.')) {
//         return;
//     }
//     else {
//         displayText += buttonPressText;
//         displayScreen.textContent = displayText;
//         if (buttonPressText === '.') {
//             pointUsed = true;
//         }
//     }
// }

// function handleNumber() {
//     updateDisplay(this);
//     previousButtonIsNum = true;
// }

// function evaluateNumbers(firstNum, secondNum, operator) {
//     if (operator === 'add') {
//         return add(firstNum, secondNum);
//     } else if (operator === 'subtract') {
//         return subtract(firstNum, secondNum);
//     } else if (operator === 'multiply') {
//         return multiply(firstNum, secondNum);
//     } else if (operator === 'divide') {
//         return divide(firstNum, secondNum);
//     }
// }

// function handleOperator() {

//     if (secondNum === None) { // first time
//         operator = this.id;
//         // TODO display on subdisplay

//     } else { // other times
//         if (operator === None) { // operator not set
//             operator = this.id;
//             // TODO display on subdisplay

//         } else { // operator set before
//             secondNum = parseFloat(displayText);
//             firstNum = evaluateNumbers(firstNum, secondNum, operator);
//             // TODO display on subdisplay and display

//         }
//     }
//     previousButtonIsNum = false;
// }


// let displayText = '';
// let subdisplayText = '';
// let evaluatedNum;
// let pointUsed = false;
// // let operatorSelected = false;
// let previousButtonIsNum = false;
// let operator;

// clearButton.addEventListener('click', clearDisplay);
// clearAllButton.addEventListener('click', clearAllDisplay);
// numberButtonList.forEach( button =>
//     button.addEventListener('click', handleNumber)
// );
// operatorList.forEach( button => {
//     button.addEventListener('click', handleOperator)
// })


// function handleButton() {
//     if (secondNum == None) {

//     }
// }

// If first time (num2 is null),
//    if equal, immediately give number as answer
//    if number and operator not set, keep adding on
//    if operator, change operator and display
//    if number and operator set, assign num1 to num2 and clear num 1
// If second time (num2 is not null),
//    if equal, immediately evaluate and give number as answer
//    if number and operator not set, keep adding on
//    if operator, set operator and display
//    if number and operator set, evaluate num1 and num2 with operator, assign it to num2
