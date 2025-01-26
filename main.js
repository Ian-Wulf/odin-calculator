function add(op1, op2) {
    return Number(op1) + Number(op2);
}

function subtract(op1, op2) {
    return Number(op1) - Number(op2);
}

function multiply(op1, op2) {
    return Number(op1) * Number(op2);
}

function divide(op1, op2) {
    return Number(op1) / Number(op2);
}

function operate(operand1, operand2, operation) {
    let result;
    switch (operation) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
    }

    return result;
}

function populateDisplay(text) {
    // New calculation
    if(evalPerformed == true) {
        if(!isNaN(text)) {
            mainDisplay.innerHTML = text;
            evalPerformed = false;
            return;
        }
        else if(text == ".") {
            mainDisplay.innerHTML = "0.";
            evalPerformed = false;
            return;
        }
    }

    if(operation != null && operand2 == null) {
        if(!isNaN(text)) {
            mainDisplay.innerHTML = text;
            operand2 = text;
            return;
        }
        else if(text == ".") {
            mainDisplay.innerHTML = "0.";
            operand2 = text;
            return;
        }
    }

    if(mainDisplay.innerHTML == "0") {
        if(text == ".") { 
            mainDisplay.innerHTML = "0.";
            return;
        }
        else {
            mainDisplay.innerHTML = text;
            return;
        }
    }
    currText = mainDisplay.innerHTML;
    mainDisplay.innerHTML = currText + text;
}

function backspace() {
    currText = mainDisplay.innerHTML;
    mainDisplay.innerHTML = currText.slice(0,-1);
}

function clearDisplay() {
    upperDisplay.innerHTML = "";
    mainDisplay.innerHTML = "0";
    operation = null;
    operand1 = null;
    operand2 = null;
    evalPerformed = false;
}

let operand1, operand2, operation = null;
let upperDisplay = document.querySelector("#upper-display");
let mainDisplay = document.querySelector("#main-display");
let evalPerformed = false;

// CONTROLLER FOR CALCULATOR BUTTON PRESSES
document.querySelector(".button-grid").addEventListener("click", e => {
    let button = e.target;

    if(button.className == "digit" || button.id == "decimal") {
        populateDisplay(button.innerHTML);
    }
    else if(button.id == "clear") {
        clearDisplay();
    }
    else if(button.id == "backspace") {
        backspace();
    }
    else if(button.className == "operator") {
        if(evalPerformed == true) {
            operation = button.innerHTML;
            upperDisplay.innerHTML = operand1 + " " + operation; 
        } 
        else {
            operand1 = mainDisplay.innerHTML;
            operation = button.innerHTML;

            upperDisplay.innerHTML = operand1 + " " + operation;
        }
    }
    else if(button.id == "evaluate") {
        operand2 = mainDisplay.innerHTML;
        
        let result = operate(operand1, operand2, operation);
        
        upperDisplay.innerHTML = "";
        mainDisplay.innerHTML = result;
        operand1 = result;
        operand2 = null;
        evalPerformed = true;
    }
});

//***TO DO***//
// Round answers w/ long decimals to prevent display overflow
// Handle pressing = before entering all numbers or an operator
// Display snarky error message if user tries to div by 0 and prevent crash
// Don't allow two operator button presses in a row
// Disable "." button if already a decimal in display
// Add keyboard support