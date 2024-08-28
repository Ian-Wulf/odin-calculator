function add(op1, op2) {
    return op1 + op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    return op1 / op2;
}

function operate(operand1, operand2, operation) {
    let result;
    switch (operation) {
        case "add":
            result = add(operand1, operand2);
            break;
        case "subtract":
            result = subtract(operand1, operand2);
            break;
        case "multiply":
            result = multiply(operand1, operand2);
            break;
        case "divide":
            result = divide(operand1, operand2);
            break;
    }

    return result;
}

let operand1, operand2, operation;

