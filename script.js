// Algorithm
// Create functions for add, subtract, multiply and divide with two numbers as its parameters, return the result value
// Create a function operate to call the right operation function: take the operation and two numbers as its parameters
// Create an event listener which listens to click on number buttons and copies the textcontent of buttons into display
// Append each number clicked to the textcontent of the display using string property

function add(num1, num2){
    let result = num1 + num2;
    return Math.round(result*100000000)/100000000;
}

function subtract(num1, num2){
    let result = num1 - num2;
    return Math.round(result*100000000)/100000000;
}

function multiply(num1, num2){
    let result = num1 * num2;
    return Math.round(result*100000000)/100000000;
}

function divide(num1, num2){
    let result = num1 / num2;
    return Math.round(result*100000000)/100000000;
}

function operate(operation, num1, num2){
    return operation(num1,num2);
}

const display = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const numbers = document.querySelectorAll('.numberBtn');
const equalsBtn = document.querySelector('.equalsBtn');
const operators = document.querySelectorAll('.operatorBtn');
const decimalBtn = document.querySelector('.decimalBtn');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
let number1;
let number2;
let operatorValue; 
let decimalCount = 0;
let operatorCount = 0;

numbers.forEach((number) => {
    number.addEventListener("click", () => { 
        operatorCount = 0;
        display.textContent += number.textContent
    })
});

operators.forEach((operator) => {
    operator.addEventListener("click", () =>{
        decimalCount = 0;
        operatorCount++;
        if(operatorCount<=1){
            number1 = display.textContent;
            number1 = Number(number1);
            operatorValue = operator.textContent;
            display.textContent += operator.textContent;
        }
    }) 
});

equalsBtn.addEventListener("click", () => {
    if (display.textContent.includes(".")){
        decimalCount++;
    }
    operatorCount = 0;
    let displayArr =  display.textContent.split("");
    if (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("X") || display.textContent.includes("÷")){
        number2 = displayArr.slice(displayArr.indexOf(operatorValue)+1);
        number2 = Number(number2.join(""));
    }
});

equalsBtn.addEventListener("click", evaluate);

decimalBtn.addEventListener("click", () =>{
    if (decimalCount===0){
        display.textContent += ".";
        decimalCount++;
    }
    operatorCount = 0;  
}); 

clearBtn.addEventListener("click", () => {  
    decimalCount = 0;
    operatorCount = 0;
    display.textContent="";
});

deleteBtn.addEventListener("click", () => {
    let beforedeletionCount = display.textContent.split(".").length;
    let firstOperatorcheck = display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("X") || display.textContent.includes("÷");
    display.textContent = display.textContent.slice(0, display.textContent.length-1);
    let secondOperatorcheck = display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("X") || display.textContent.includes("÷");
    let afterdeletionCount = display.textContent.split(".").length;
    if (beforedeletionCount>afterdeletionCount){
        decimalCount = 0;
    }
    if (firstOperatorcheck !== secondOperatorcheck){
        operatorCount = 0;
    }
});

function evaluate(){
    if (operatorValue === "+"){
        display.textContent = operate(add, number1, number2);
    }
    else if (operatorValue === "-"){
        display.textContent = operate(subtract, number1, number2);
    }
    else if (operatorValue === "X"){
        display.textContent = operate(multiply, number1, number2);
    }
    else if (operatorValue === "÷"){
        display.textContent = operate(divide, number1, number2);
    }
}