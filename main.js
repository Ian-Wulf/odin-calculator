function longDecimal(num) {
    const numStr = num.toString();
    const decIndex = numStr.indexOf(".");
    // No decimal
    if (decIndex === -1) {
        return false;
    }

    const decPlaces = numStr.length - decIndex - 1;
    return decPlaces > 2;
}

function add(op1, op2) {
    let result =  Number(op1) + Number(op2);
 
    if(longDecimal(result)) {
        console.log("long decimal");
        return result.toFixed(2);
    }

    return result;
}

function subtract(op1, op2) {
    let result =  Number(op1) - Number(op2);
    
    if(longDecimal(result)) {
        console.log("long decimal");
        return result.toFixed(2);
    }

    return result;
}

function multiply(op1, op2) {
    let result =  Number(op1) * Number(op2);

    if(longDecimal(result)) {
        console.log("long decimal");
        return result.toFixed(2);
    }

    return result;
}

function divide(op1, op2) {
    if (op2 == 0) {
        return "Woops!";
    }

    let result =  Number(op1) / Number(op2);

    if(longDecimal(result)) {
        console.log("long decimal");
        return result.toFixed(2);
    }

    return result;
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
            hasDecimal = true;
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
            hasDecimal = true;
            operand2 = text;
            return;
        }
    }

    if(mainDisplay.innerHTML == "0") {
        if(text == ".") { 
            mainDisplay.innerHTML = "0.";
            hasDecimal = true;
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
    // If decimal removed, reenable decimal button
    if(!mainDisplay.innerHTML.includes(".")) {
        hasDecimal = false;
    }
}

function clearDisplay() {
    upperDisplay.innerHTML = "";
    mainDisplay.innerHTML = "0";
    operation = null;
    operand1 = null;
    operand2 = null;
    evalPerformed = false;
    hasDecimal = false;
}

let operand1, operand2, operation = null;
let upperDisplay = document.querySelector("#upper-display");
let mainDisplay = document.querySelector("#main-display");
let hasDecimal = false;
let evalPerformed = false;

// CONTROLLER FOR CALCULATOR BUTTON PRESSES
document.querySelector(".button-grid").addEventListener("click", e => {
    let button = e.target;

    if(button.className == "digit" || button.id == "decimal") {
        if(button.className == "digit") {
            populateDisplay(button.innerHTML);
        }
        else if(button.id == "decimal" && !hasDecimal) {
            populateDisplay(button.innerHTML);
            hasDecimal = true;
        }
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
        // Check if operator entered
        if (operation != null) {
            operand2 = mainDisplay.innerHTML;
            
            let result = operate(operand1, operand2, operation);
            
            upperDisplay.innerHTML = "";
            mainDisplay.innerHTML = result;
            operand1 = result;
            operand2 = null;
            evalPerformed = true;
        }
    }
});