// Algorithm
// Create functions for add, subtract, multiply and divide with two numbers as its parameters, return the result value
// Create a function operate to call the right operation function: take the operation and two numbers as its parameters
// Create an event listener which listens to click on number buttons and copies the textcontent of buttons into display
// Append each number clicked to the textcontent of the display using string property

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

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numberBtn');

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        display.textContent += number.textContent;
    })
});
