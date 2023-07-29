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

let firstNum;
let operatorMapping = {
    '+' : add,
    '-' : subtract,
    '*' : multiply,
    '/' : divide,
};
let secondNum;

function operate(operator, num1, num2) {
    return operatorMapping[operator](num1, num2);
}

// function for clearing display
function clearDisplay() {
    displayText = '';
    displayScreen.textContent = displayText;
    pointUsed = false;
}

function clearSubdisplay() {
    subdisplayText = '';
    subdisplayScreen.textContent = subdisplayText;
}

function clearAllDisplay() {
    clearSubdisplay();
    clearDisplay();
}

// function to update display
function updateDisplay() {

    console.log(pointUsed)

    let buttonPressText = this.textContent;

    if ((pointUsed) & (buttonPressText === '.')) {
        return;
    } else if ((displayText[displayText.length - 1] === '.') &
               (buttonPressText === '.')) {
        return;
    }
    else {
        displayText += buttonPressText;
        displayScreen.textContent = displayText;
        if (buttonPressText === '.') {
            pointUsed = true;
        }
    }
}

let clearButton = document.querySelector('#clear')
let clearAllButton = document.querySelector('#clearAll')
let displayScreen = document.querySelector('.display')
let subdisplayScreen = document.querySelector('.subdisplay')
let numberButtonList = document.querySelectorAll('.number')
let displayText = '';
let subdisplayText = '';
let currVal;
let pointUsed = false;

clearButton.addEventListener('click', clearDisplay);
clearAllButton.addEventListener('click', clearAllDisplay);
numberButtonList.forEach( button =>
    button.addEventListener('click', updateDisplay)
);
