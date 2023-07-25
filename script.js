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
function clear() {
    displayScreen.textContent = ''
    pointUsed = false;
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

let clearButton = document.querySelector('.clear')
let displayScreen = document.querySelector('.display')
let numberButtonList = document.querySelectorAll('.number')
let displayText = '';
let currVal;
let pointUsed = false;

clearButton.addEventListener('click', clear);
numberButtonList.forEach( button =>
    button.addEventListener('click', updateDisplay)
);
