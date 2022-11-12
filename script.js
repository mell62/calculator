// Algorithm
// Create functions for add, subtract, multiply and divide with two numbers as its parameters, return the result value
// Create a function operate to call the right operation function: take the operation and two numbers as its parameters

function add(num1, num2){
    let result = num1 + num2;
    return result;
}

function subtract(num1, num2){
    let result = num1 - num2;
    return result;
}

function multiply(num1, num2){
    let result = num1 * num2;
    return result;
}

function divide(num1, num2){
    let result = num1 / num2;
    return result;
}

function operate(operation, num1, num2){
    return operation(num1,num2);
}