/*  NOTES 
grab element id for display
need current input
make empty array
need functions clearInput, calculateResult()
stack for arithmetic? said we should parse string
*/

let currentInput = '';
let calculation = [];

function display(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === 'C') {
    clearInput();
  } else {
    currentInput += value;
    document.getElementById('display').value = currentInput;
  }
}

function clearInput() {
  currentInput = '';
  calculation = [];
  document.getElementById('display').value = currentInput;
}

function calculateResult() {
  if (currentInput === '') return;

  try {
    const result = calculate(currentInput);
    document.getElementById('display').value = result;
    currentInput = result; 
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function calculate(input) {
  const operators = ['+', '-', 'x', '/'];
  const operatorPrecedence = {
    '+': 1,
    '-': 1,
    'x': 2,
    '/': 2,
  };

  const numStack = [];
  const operatorStack = [];

  for (const char of input) {
    if (!isNaN(char)) {
      numStack.push(parseFloat(char));
    } else if (operators.includes(char)) {
      while (
        operatorStack.length > 0 &&
        operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[char]
      ) {
        const operator = operatorStack.pop();
        const num2 = numStack.pop();
        const num1 = numStack.pop();

        switch (operator) {
          case '+':
            numStack.push(num1 + num2);
            break;
          case '-':
            numStack.push(num1 - num2);
            break;
          case 'x':
            numStack.push(num1 * num2);
            break;
          case '/':
            if (num2 === 0) {
              return ("Error");
            }
            numStack.push(num1 / num2);
            break;
          default:
            return ("Error");
        }
      }
      operatorStack.push(char);
    }
  }

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const num2 = numStack.pop();
    const num1 = numStack.pop();

    switch (operator) {
      case '+':
        numStack.push(num1 + num2);
        break;
      case '-':
        numStack.push(num1 - num2);
        break;
      case 'x':
        numStack.push(num1 * num2);
        break;
      case '/':
        if (num2 === 0) {
          return ("Error");
        }
        numStack.push(num1 / num2);
        break;
      default:
        return ("Error");
    }
  }

  if (numStack.length !== 1) {
    return ("Error");
  }

  return numStack[0].toString();
}