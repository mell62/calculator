// Algorithm
// Create functions for add, subtract, multiply and divide with two numbers as its parameters, return the result value
// Create a function operate to call the right operation function: take the operation and two numbers as its parameters
// Create an event listener which listens to click on number buttons and copies the textcontent of buttons into display
// Append each number clicked to the textcontent of the display using string property

function add(num1, num2) {
  let result = num1 + num2;
  return Math.round(result * 100000) / 100000;
}

function subtract(num1, num2) {
  let result = num1 - num2;
  return Math.round(result * 100000) / 100000;
}

function multiply(num1, num2) {
  let result = num1 * num2;
  return Math.round(result * 100000) / 100000;
}

function divide(num1, num2) {
  let result = num1 / num2;
  return Math.round(result * 100000) / 100000;
}

function operate(operation, num1, num2) {
  return operation(num1, num2);
}

const display = document.querySelector(".main-display");
const subDisplay = document.querySelector(".sub-display");
const numbers = document.querySelectorAll(".numberBtn");
const equalsBtn = document.querySelector(".equalsBtn");
const operators = document.querySelectorAll(".operatorBtn");
const decimalBtn = document.querySelector(".decimalBtn");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
let number1;
let number2;
let operatorValue;
let decimalCount = 0;
let operatorCount = 0;
let equalsCount = 0;
let result;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (equalsCount) {
      equalsCount = 0;
      display.textContent = "";
      subDisplay.textContent = "";
    }
  });
  number.addEventListener("click", () => {
    if (
      display.textContent.length < 8 ||
      number1 === Number(display.textContent)
    ) {
      if (display.textContent === "-") {
        display.textContent += number.textContent;
        operatorCount = 0;
      } else if (
        display.textContent !== "Undefined" &&
        operatorCount &&
        display.textContent !== "Number limit exceeded"
      ) {
        display.textContent = "";
        display.textContent += number.textContent;
        operatorCount = 0;
      } else if (
        display.textContent !== "Undefined" &&
        !operatorCount &&
        display.textContent !== "Number limit exceeded"
      ) {
        display.textContent += number.textContent;
      }
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operator.textContent === "-") {
      if (display.textContent === "" || operatorCount) {
        display.textContent = "-";
      }
    }
  });

  operator.addEventListener("click", () => {
    if (
      subDisplay.textContent.includes(operatorValue) &&
      display.textContent !== "-" &&
      operatorCount === 0
    ) {
      number2 = Number(display.textContent);
      display.textContent = evaluate();
      if (display.textContent.length > 10) {
        display.textContent = "Number limit exceeded";
      }
      operatorValue = operator.textContent;
    }
  });
  operator.addEventListener("click", () => {
    decimalCount = 0;
    operatorCount++;
    equalsCount = 0;
    if (operatorCount <= 1) {
      if (display.textContent === "") {
        number1 = 0;
        display.textContent = "0";
      } else {
        number1 = Number(display.textContent);
        if (number1 === Math.floor(number1)) {
          number1 = Math.floor(number1);
          display.textContent = number1;
        }
      }
      if (
        display.textContent !== "Undefined" &&
        display.textContent !== "-" &&
        display.textContent !== "Number limit exceeded"
      ) {
        operatorValue = operator.textContent;
        subDisplay.textContent = display.textContent + operator.textContent;
      } else {
        subDisplay.textContent = "";
      }
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (subDisplay.textContent) {
    if (operatorCount) {
      number2 = 0;
    } else {
      number2 = Number(display.textContent);
      if (number2 === Math.floor(number2)) {
        number2 = Math.floor(number2);
        display.textContent = number2;
      }
    }
  }
});

equalsBtn.addEventListener("click", () => {
  if (operatorCount) {
    subDisplay.textContent += "0" + "=";
    display.textContent = evaluate();
    operatorValue = undefined;
    equalsCount++;
  } else if (display.textContent && !equalsCount) {
    subDisplay.textContent += display.textContent + "=";
    display.textContent = evaluate();
    if (display.textContent.length > 10) {
      display.textContent = "Number limit exceeded";
    }
    operatorValue = undefined;
    equalsCount++;
  }
});

equalsBtn.addEventListener("click", () => {
  if (display.textContent.includes(".")) {
    decimalCount++;
  }
});

equalsBtn.addEventListener("click", () => {
  operatorCount = 0;
});

decimalBtn.addEventListener("click", () => {
  if (equalsCount) {
    equalsCount = 0;
    decimalCount = 0;
    display.textContent = "";
    subDisplay.textContent = "";
  }
});

decimalBtn.addEventListener("click", () => {
  if (decimalCount === 0) {
    if (display.textContent === "" || operatorCount) {
      display.textContent = "0" + ".";
      decimalCount++;
    } else {
      display.textContent += ".";
      decimalCount++;
    }
  }
  operatorCount = 0;
});

clearBtn.addEventListener("click", () => {
  decimalCount = 0;
  operatorCount = 0;
  operatorValue = undefined;
  display.textContent = "";
  subDisplay.textContent = "";
  number1 = NaN;
  number2 = NaN;
});

deleteBtn.addEventListener("click", () => {
  if (
    display.textContent !== "Undefined" &&
    display.textContent !== "Number limit exceeded"
  ) {
    let beforedeletionCount = display.textContent.split(".").length;
    let firstOperatorcheck =
      display.textContent.includes("+") ||
      display.textContent.includes("-") ||
      display.textContent.includes("X") ||
      display.textContent.includes("÷");
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
    let secondOperatorcheck =
      display.textContent.includes("+") ||
      display.textContent.includes("-") ||
      display.textContent.includes("X") ||
      display.textContent.includes("÷");
    let afterdeletionCount = display.textContent.split(".").length;
    if (beforedeletionCount > afterdeletionCount) {
      decimalCount = 0;
    }
    if (firstOperatorcheck !== secondOperatorcheck) {
      operatorCount = 0;
    }
  }
});

function evaluate() {
  if (operatorValue === "+") {
    return (result = operate(add, number1, number2));
  } else if (operatorValue === "-") {
    return (result = operate(subtract, number1, number2));
  } else if (operatorValue === "X") {
    return (result = operate(multiply, number1, number2));
  } else if (operatorValue === "÷") {
    if (number2 === 0) {
      return (result = "Undefined");
    } else {
      return (result = operate(divide, number1, number2));
    }
  } else {
    return (result = display.textContent);
  }
}
