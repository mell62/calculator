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
  number.addEventListener("mouseover", () => {
    number.classList.add("hover");
    number.classList.add("hoverNumbersDecimal");
  });
});

operators.forEach((operator) => {
  operator.addEventListener("mouseover", () => {
    operator.classList.add("hover");
    operator.classList.add("hoverOperators");
  });
});

decimalBtn.addEventListener("mouseover", () => {
  decimalBtn.classList.add("hover");
  decimalBtn.classList.add("hoverNumbersDecimal");
});

equalsBtn.addEventListener("mouseover", () => {
  equalsBtn.classList.add("hover");
  equalsBtn.classList.add("hoverEquals");
});

clearBtn.addEventListener("mouseover", () => {
  clearBtn.classList.add("hover");
  clearBtn.classList.add("hoverClearDelete");
});

deleteBtn.addEventListener("mouseover", () => {
  deleteBtn.classList.add("hover");
  deleteBtn.classList.add("hoverClearDelete");
});

numbers.forEach((number) => {
  number.addEventListener("mouseleave", () => {
    number.classList.remove("hover");
    number.classList.remove("hoverNumbersDecimal");
  });
});

operators.forEach((operator) => {
  operator.addEventListener("mouseleave", () => {
    operator.classList.remove("hover");
    operator.classList.remove("hoverOperators");
  });
});

decimalBtn.addEventListener("mouseleave", () => {
  decimalBtn.classList.remove("hover");
  decimalBtn.classList.remove("hoverNumbersDecimal");
});

equalsBtn.addEventListener("mouseleave", () => {
  equalsBtn.classList.remove("hover");
  equalsBtn.classList.remove("hoverEquals");
});

clearBtn.addEventListener("mouseleave", () => {
  clearBtn.classList.remove("hover");
  clearBtn.classList.remove("hoverClearDelete");
});

deleteBtn.addEventListener("mouseleave", () => {
  deleteBtn.classList.remove("hover");
  deleteBtn.classList.remove("hoverClearDelete");
});

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
  if (display.textContent === "-") {
    display.textContent = "";
    subDisplay.textContent = "";
    operatorCount = 0;
  }
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

//keyboard support code

window.addEventListener("keydown", (event) => {
  if (event.key >= 0 && event.key <= 9) {
    if (equalsCount) {
      equalsCount = 0;
      display.textContent = "";
      subDisplay.textContent = "";
    }
    if (
      display.textContent.length < 8 ||
      number1 === Number(display.textContent)
    ) {
      if (display.textContent === "-") {
        display.textContent += event.key;
        operatorCount = 0;
      } else if (
        display.textContent !== "Undefined" &&
        operatorCount &&
        display.textContent !== "Number limit exceeded"
      ) {
        display.textContent = "";
        display.textContent += event.key;
        operatorCount = 0;
      } else if (
        display.textContent !== "Undefined" &&
        !operatorCount &&
        display.textContent !== "Number limit exceeded"
      ) {
        display.textContent += event.key;
      }
    }
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "x" ||
    event.key === "X" ||
    event.key === "/"
  ) {
    if (event.key === "-") {
      if (display.textContent === "" || operatorCount) {
        display.textContent = "-";
      }
    }
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
      if (event.key === "x" || event.key === "*") {
        operatorValue = "X";
      } else if (event.key === "/") {
        operatorValue = "÷";
      } else {
        operatorValue = event.key;
      }
    }
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
        if (event.key === "x" || event.key === "*") {
          operatorValue = "X";
          subDisplay.textContent = display.textContent + "X";
        } else if (event.key === "/") {
          operatorValue = "÷";
          subDisplay.textContent = display.textContent + "÷";
        } else {
          operatorValue = event.key;
          subDisplay.textContent = display.textContent + event.key;
        }
      } else {
        subDisplay.textContent = "";
      }
    }
  } else if (event.key === "=" || event.key === "Enter") {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    if (display.textContent === "-") {
      display.textContent = "";
      subDisplay.textContent = "";
      operatorCount = 0;
    }
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
    if (display.textContent.includes(".")) {
      decimalCount++;
    }
    operatorCount = 0;
  } else if (event.key === ".") {
    if (equalsCount) {
      equalsCount = 0;
      decimalCount = 0;
      display.textContent = "";
      subDisplay.textContent = "";
    }
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
  } else if (event.key === "C" || event.key === "c") {
    decimalCount = 0;
    operatorCount = 0;
    operatorValue = undefined;
    display.textContent = "";
    subDisplay.textContent = "";
    number1 = NaN;
    number2 = NaN;
  } else if (event.key === "Backspace" || event.key === "Delete") {
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
