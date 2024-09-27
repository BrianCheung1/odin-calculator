const container = document.querySelector("#container")
const display = document.createElement("div")
const displayText = document.createElement("p")
const digitContainer = document.createElement("div")
const operatorContainer = document.createElement("div")
const buttonContainer = document.createElement("div")
const plusButton = document.createElement("button")
const subtractButton = document.createElement("button")
const multiplyButton = document.createElement("button")
const divideButton = document.createElement("button")
const equalButton = document.createElement("button")
const clearButton = document.createElement("button")
const decimalButton = document.createElement("button")

display.classList.add("display")
displayText.textContent = ""
display.appendChild(displayText)
container.appendChild(display)
digitContainer.classList.add("digit-container")
operatorContainer.classList.add("operator-container")
buttonContainer.classList.add("button-container")
plusButton.textContent = "+"
subtractButton.textContent = "-"
multiplyButton.textContent = "*"
divideButton.textContent = "/"
equalButton.textContent = "="
clearButton.textContent = "CLEAR"
decimalButton.textContent = "."

let firstNumber = 0
let operator = ""
let secondNumber = 0
let operatorClicked = false
let isFirstNumber = true
let isEqualClicked = false

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) {
    return "Can't Divide By Zero"
  }
  return Math.round((a / b) * 100) / 100
}

function operate(first, second, operator) {
  if (operator == "+") {
    return add(first, second)
  } else if (operator == "-") {
    return subtract(first, second)
  } else if (operator == "*") {
    return multiply(first, second)
  } else if (operator == "/") {
    return divide(first, second)
  }
}

function determineFirstNumber() {
  if (operatorClicked) {
    isEqualClicked = false
    return
  }
  if (isFirstNumber) {
    if (displayText.textContent !== "") {
      if (display.textContent === "Can't Divide By Zero") {
        firstNumber = 0
      } else {
        firstNumber = parseFloat(displayText.textContent)
      }
    }
  } else if (!isFirstNumber) {
    secondNumber = parseFloat(displayText.textContent)
    let result = operate(firstNumber, secondNumber, operator)
    displayText.textContent = result
    firstNumber = result
    secondNumber = 0
  }
  operatorClicked = true
  isFirstNumber = false
}

function clearAll() {
  firstNumber = 0
  secondNumber = 0
  operator = ""
  isFirstNumber = true
  operatorClicked = false
  decimalButton.disabled = false
}

plusButton.addEventListener("click", () => {
  operator = "+"
  determineFirstNumber()
})
subtractButton.addEventListener("click", () => {
  operator = "-"
  determineFirstNumber()
})
multiplyButton.addEventListener("click", () => {
  operator = "*"
  determineFirstNumber()
})
divideButton.addEventListener("click", () => {
  operator = "/"
  determineFirstNumber()
})
equalButton.addEventListener("click", () => {
  determineFirstNumber()
  clearAll()
  isEqualClicked = true
})
clearButton.addEventListener("click", () => {
  displayText.textContent = ""
  clearAll()
})
decimalButton.addEventListener("click", () => {
  displayText.textContent += "."
  decimalButton.disabled = true
})

operatorContainer.appendChild(plusButton)
operatorContainer.appendChild(subtractButton)
operatorContainer.appendChild(multiplyButton)
operatorContainer.appendChild(divideButton)
operatorContainer.appendChild(equalButton)

const MAX_DISPLAY_LENGTH = 12
for (let i = 9; i >= 0; i--) {
  const digitButton = document.createElement("button")
  digitButton.textContent = i
  digitButton.addEventListener("click", () => {
    if (operatorClicked || isEqualClicked) {
      displayText.textContent = i
      operatorClicked = false
      isEqualClicked = false
    } else {
      if (displayText.textContent.length < MAX_DISPLAY_LENGTH) {
        displayText.textContent += i
      }
    }
  })
  digitContainer.appendChild(digitButton)
}

digitContainer.appendChild(decimalButton)
digitContainer.appendChild(clearButton)

buttonContainer.appendChild(digitContainer)
buttonContainer.appendChild(operatorContainer)
container.appendChild(buttonContainer)

function handleBackspace() {
  displayText.textContent = displayText.textContent.slice(0, -1)
}

const numbers = "0123456789"
document.addEventListener("keydown", (event) => {
  if (event.key == "Backspace") {
    handleBackspace()
    event.preventDefault()
  } else if (numbers.includes(event.key)) {
    displayText.textContent += event.key
  }
})
