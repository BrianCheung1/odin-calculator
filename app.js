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
const backspaceButton = document.createElement("button")
const flipButton = document.createElement("button")
const percentButton = document.createElement("button")

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
backspaceButton.textContent = "DELETE"
flipButton.textContent = "+/-"
percentButton.textContent = "%"

let firstNumber = 0
let operator = ""
let secondNumber = 0
let operatorClicked = false
let isFirstNumber = true
let isFunctionClicked = false

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
  return a / b
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
    if (displayText.textContent !== "") {
      secondNumber = parseFloat(displayText.textContent)
      let result = operate(firstNumber, secondNumber, operator)
      if (result == "Can't Divide By Zero") {
        displayText.textContent = "Can't Divide By Zero"
      } else {
        displayText.textContent = Math.round(result * 100) / 100
        firstNumber = result
        secondNumber = 0
      }
    }
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
  isFunctionClicked = true
})
clearButton.addEventListener("click", () => {
  displayText.textContent = ""
  clearAll()
})
decimalButton.addEventListener("click", () => {
  displayText.textContent += "."
  decimalButton.disabled = true
})
backspaceButton.addEventListener("click", () => {
  displayText.textContent = displayText.textContent.slice(0, -1)
})
flipButton.addEventListener("click", () => {
  isFunctionClicked = true
  displayText.textContent = (parseFloat(displayText.textContent) * -1)
})
percentButton.addEventListener("click", () => {
  isFunctionClicked = true
  displayText.textContent = (parseFloat(displayText.textContent) / 100)
})

operatorContainer.appendChild(plusButton)
operatorContainer.appendChild(subtractButton)
operatorContainer.appendChild(multiplyButton)
operatorContainer.appendChild(divideButton)
operatorContainer.appendChild(equalButton)

digitContainer.append(backspaceButton)
digitContainer.append(flipButton)
digitContainer.append(percentButton)

const MAX_DISPLAY_LENGTH = 12

function createDigits(start, end) {
  for (let i = start; i <= end; i++) {
    const digitButton = document.createElement("button")
    digitButton.textContent = i
    digitButton.addEventListener("click", () => {
      if (operatorClicked || isFunctionClicked) {
        displayText.textContent = i
        operatorClicked = false
        isFunctionClicked = false
      } else {
        if (displayText.textContent.length < MAX_DISPLAY_LENGTH) {
          displayText.textContent += i
        }
      }
    })
    digitContainer.appendChild(digitButton)
  }
}
createDigits(7, 9)
createDigits(4, 6)
createDigits(1, 3)
createDigits(0, 0)

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
  console.log(event.key)
  if (event.key == "Backspace") {
    handleBackspace()
  } else if (numbers.includes(event.key)) {
    if (operatorClicked) {
      displayText.textContent = event.key
      operatorClicked = false
    } else {
      if (displayText.textContent.length < MAX_DISPLAY_LENGTH) {
        displayText.textContent += event.key
      }
    }
  } else if (event.key === "+") {
    operator = "+"
    determineFirstNumber()
  } else if (event.key === "-") {
    operator = "-"
    determineFirstNumber()
  } else if (event.key === "*") {
    operator = "*"
    determineFirstNumber()
  } else if (event.key === "/") {
    operator = "/"
    determineFirstNumber()
  } else if (event.key === "=" || event.key === "Enter") {
    determineFirstNumber()
    clearAll()
  } else if (event.key === ".") {
    if (!display.textContent.includes(".")) {
      displayText.textContent += "."
      decimalButton.disabled = true
    }
  }
  event.preventDefault()
})
