const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    // Add animation
    button.classList.add("key-active");
    setTimeout(() => button.classList.remove("key-active"), 100);

    if (value === "C") {
      currentInput = "";
      previousInput = "";
      operator = "";
      updateDisplay("0");
    } else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1) || "0";
      updateDisplay(currentInput);
    } else if (value === "=") {
      if (currentInput && previousInput) {
        currentInput = calculate(previousInput, currentInput, operator);
        operator = "";
        previousInput = "";
        updateDisplay(currentInput);
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput) {
        if (previousInput) {
          currentInput = calculate(previousInput, currentInput, operator);
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+": return (a + b).toString();
    case "-": return (a - b).toString();
    case "*": return (a * b).toString();
    case "/": return b !== 0 ? (a / b).toString() : "Error";
    default: return "0";
  }
}

function updateDisplay(value) {
  display.textContent = value;
}
