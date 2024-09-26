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
  if (a === 0 || b === 0) {
    return "Can't divide by 0"
  }
  return a / b
}

let firstNumber = 0
let operator = ""
let secondNumber = 0
let operatorClicked = false
let isFirstNumber = true

function operate(first, second, operator) {
  first = parseInt(first)
  second = parseInt(second)
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
const container = document.querySelector("#container")
const display = document.createElement("div")
display.classList.add("display")
const displayText = document.createElement("p")
displayText.textContent = ""
display.appendChild(displayText)
container.appendChild(display)

const buttonContainer = document.createElement("div")
buttonContainer.classList.add("button-container")

const plusButton = document.createElement("button")
plusButton.textContent = "+"
const subtractButton = document.createElement("button")
subtractButton.textContent = "-"
const multiplyButton = document.createElement("button")
multiplyButton.textContent = "*"
const divideButton = document.createElement("button")
divideButton.textContent = "/"
const equalButton = document.createElement("button")
equalButton.textContent = "="
const clearButton = document.createElement("button")
clearButton.textContent = "CLEAR"

function determineFirstNumber() {
  if (isFirstNumber) {
    firstNumber = parseInt(displayText.textContent)
  } else if (!isFirstNumber) {
    secondNumber = parseInt(displayText.textContent)
    let result = operate(firstNumber, secondNumber, operator)
    displayText.textContent = Math.round(result * 100) / 100
    console.log(`result ${result}`)
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
})
clearButton.addEventListener("click", () => {
  displayText.textContent = ""
  clearAll()
})

buttonContainer.appendChild(plusButton)
buttonContainer.appendChild(subtractButton)
buttonContainer.appendChild(multiplyButton)
buttonContainer.appendChild(divideButton)
buttonContainer.appendChild(equalButton)
buttonContainer.appendChild(clearButton)

for (let i = 0; i < 10; i++) {
  const digitButton = document.createElement("button")
  digitButton.textContent = i
  digitButton.addEventListener("click", () => {
    if (operatorClicked) {
      displayText.textContent = i
      operatorClicked = false
    } else {
      displayText.textContent += i
    }
  })
  buttonContainer.appendChild(digitButton)
}

container.appendChild(buttonContainer)
