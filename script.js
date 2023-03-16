const display = document.querySelector('#display');
const clearAll = document.querySelector('#delete-all');
const equal = document.querySelector('#equal');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const floatPoint = document.querySelector('#float-point');
const deleteLast = document.querySelector('#delete-one');

let displayValue = display.textContent;
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result;

//// This is an event listener for the keydown event. It listens for keyboard input and triggers functions accordingly.
window.addEventListener('keydown', (e) => {
    if(firstOperand === null){
        if(e.key >= 0 && e.key <= 9) currentDisplayValue(e.key)
    };

    definingSecondOperand(e.key);

    if(e.key === '.') appendFloatPoint(e.key);

    if(e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === '%') definingOperator(convertOperator(e.key));

    if(e.key === '=' || e.key === 'Enter') equalFunction();

    if(e.key === 'Backspace') deleteLastDigit();

    if(e.key === 'Escape') deleteAllDigits();
})

// This code adds a click event listener to each element in the "numbers" array and sets the clicked number as the first or second operand depending on whether the first operand is null or not.
numbers.forEach((number) => 
    number.addEventListener('click', () => {
        firstOperand === null ? currentDisplayValue(number.textContent) : null;
        definingSecondOperand(number.textContent)
    })
);

// This code adds a click event listener to each element in the "operators" array. When an operator is clicked, it defines it as the operator for the calculation.
operators.forEach((operator) =>
    operator.addEventListener('click', () => {
        definingOperator(convertOperator(operator.textContent))
    })
);

equal.addEventListener('click', () => {
    equalFunction();
});

clearAll.addEventListener('click', () => {
    deleteAllDigits();
});

deleteLast.addEventListener('click', () => {
    deleteLastDigit();
});

floatPoint.addEventListener('click' , () => {
    appendFloatPoint(floatPoint.textContent);
});

// This function updates the calculator display with a number and checks if the current value is zero. If it is, the new number replaces it. 
const currentDisplayValue = (number) => {
    display.textContent === '0' || display.textContent === 0 ? display.textContent = " " : null;

// The maximum length of the display is 9 digits. If there is no first operator defined yet, the number is appended to the display and the displayValue variable is updated.    
    if(display.textContent.length < 10){
        if(firstOperator === null){
            display.textContent += number;
            displayValue = display.textContent;
        }
    }
};

// This function takes a number as an argument and defines it as the second operand. If a first operand has been defined, the function updates the second operand with the new number.
const definingSecondOperand = (number) =>{
    if(firstOperand != null){
        secondOperand = secondOperand === null ? number : secondOperand + number;
        // The maximum length of the second operand is 10 digits, and if it exceeds this limit, it does not update the display.
        secondOperand.length < 10 ? display.textContent = secondOperand : null;
    }
}; 

//  It sets the operator as the first or second operator depending on whether there is a first operator defined yet.
const definingOperator = (op) => {
    firstOperand = displayValue;

    if(firstOperator === null && secondOperator === null){
        firstOperator = op;
    }
    else if((firstOperator != null && secondOperator === null) || (firstOperator != null && secondOperator != null)){
        secondOperator = op;
    }
    operatorResult(op);
}

// This function performs the calculation when the equal sign is clicked.If all three variables necessary for the calculation are defined, it calls "operate".
const equalFunction = () => {
    if(firstOperand != null && firstOperator != null && secondOperand != null){
        result = operate(firstOperator,firstOperand, secondOperand);
        equalValues();
    }
    else if(firstOperand === result && secondOperator != null && secondOperand != null){
        result = operate(secondOperator, firstOperand, secondOperand);
        equalValues()
    }
}

//returns the variables values to their initial values.
const deleteAllDigits = ( ) => {
    displayValue = (display.textContent = 0);
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
};

//takes the value displayed and delete the last digit in screen. 
const deleteLastDigit = ()  => {
    if(firstOperand === null){
        display.textContent = display.textContent.slice(0, -1);
        displayValue = display.textContent;
    }else if(secondOperand != null){
        display.textContent = display.textContent.slice(0, -1);
        secondOperand = display.textContent;
    }
    else if(firstOperand != null){
        firstOperand === '???' ? (display.textContent = 0 , firstOperand = null) : (display.textContent = display.textContent.slice(0, -1), displayValue = display.textContent);
    }
};

//it apppends the float point to the firstOperand or secondOperand value.
const appendFloatPoint = (point) => {
    if(firstOperand === null){
        //it searchs for the dot('.') in the firstOpeand value and stops if there's one already.
        display.textContent.includes('.') === false ? display.textContent += point : null; 
    }
    else if(firstOperand != null){
        //it searchs for the dot('.') in the secondOpeand value and stops if there's one already.
        secondOperand.includes('.') === false ? (secondOperand += point, display.textContent = secondOperand) : null
    }
};

//this code restarts a few values into their initials and change a few others to keep the calculator working.
const equalValues = () => {
    firstOperand = result;
    secondOperand = null;
    display.textContent = result;
    displayValue = result;
    firstOperator = null;
    secondOperator = null;
}

//calculates the operations if an operator is been clicked.
const operatorResult = (operator) => {
    //calculates "operate" if firstOperator is defined and a second operator has been clicked, then change firstOperand value to result. 
    if(firstOperand != null && firstOperator != null && secondOperand != null && secondOperator != null){
        result = operate(firstOperator, firstOperand, secondOperand);
        firstOperand = result;
        secondOperand = null;
        display.textContent = result;
        displayValue = result;
        firstOperator = null;   
    }
    //calculates "operate" if secondOperator is defined and an operator has been clicked.
    if(secondOperand != null){
        result = operate(secondOperator, firstOperand, secondOperand);
        firstOperand = result;
        secondOperand = null;
        display.textContent = result;
        displayValue = result;
        (firstOperand === result && secondOperator != null && secondOperand === null) ? secondOperator = operator : null;
    }
};

//converts the input value to an operable value.
const convertOperator = (op) => {
    if(op === '*') return '*';
    if(op === '/') return '/'
    if(op === 'x') return '*';
    if(op === '÷') return '/';
    if(op === '%') return '%';
    if(op === '+') return '+';
    if(op === '-') return '-';
};

//takes the firstOpeand as 'a' and secondOpeand as 'b' then do the sum.
const add = (a, b) => {
    result = a + b;
    // if the result is a float number, it checks if the decimals are more than three, then adjusts it to three decimals at the most.
    if(result % 1 != 0){
        return ((result.toString().split('.')[1] || '').length > 2 ? result.toFixed(3) : result);
    } 
    return result;
};

//takes the firstOpeand as 'a' and secondOpeand as 'b' then do the substraction.
const subtract = (a, b) => {
    result = a - b;
    if(result % 1 != 0){
        return ((result.toString().split('.')[1] || '').length > 2 ? result.toFixed(3) : result);
    } 
    return result;
};

//takes the firstOpeand as 'a' and secondOpeand as 'b' then do the multiplication.
const multiply = (a, b) => {
    result = a * b;
    if(result % 1 != 0){
        return ((result.toString().split('.')[1] || '').length > 2 ? result.toFixed(3) : result);
    } 
    return result;
};

//takes the firstOpeand as 'a' and secondOpeand as 'b' then do the division.
const divide = (a, b) => {
    result = a / b;
    if(result % 1 != 0){
        return ((result.toString().split('.')[1] || '').length > 2 ? result.toFixed(3) : result);
    } 
    return result;
};

//takes the firstOpeand as 'a' and secondOpeand as 'b' then calculates the percentage.
const percentage = (a, b) => {
    result = a * (b / 100);
    if(result % 1 != 0){
        return ((result.toString().split('.')[1] || '').length > 2 ? result.toFixed(3) : result);
    } 
    return result;
};

//it looks up for the operator, the firstOperand and secondOperand and then do the appropriate operation base on operator.
const operate = (op, a, b) => {
    let numA = parseFloat(a);
    let numB = parseFloat(b);
    
    switch (op){
        case '+':
            result = add(numA, numB);
            break;
        case '-':
            result = subtract(numA, numB);
            break;
        case '*':
            result = multiply(numA, numB);
            break;
        case '/': 
            if(b == 0){
                return '???';
            }    
            else{
                return divide(numA, numB);
            }
        case '%': 
            result = percentage(numA, numB);
            break;
        default:
            return null;
    }
    return result;
};