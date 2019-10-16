class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getNumberDisplay(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText =  this.getNumberDisplay(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getNumberDisplay(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+' : 
            computation = prev + current
        break
            case '-' : 
            computation = prev - current
        break
            case '×':
            computation = prev * current
        break
            case '÷' : 
            computation = prev / current
        break
            default : return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
}

const num = document.querySelectorAll('[data-numbers]');
const operators = document.querySelectorAll('[data-operators]')
const equalBtn = document.querySelector('[data-equal]');
const acBtn = document.querySelector('[data-ac]');
const delBtn = document.querySelector('[data-del]');
const bcBtn = document.querySelector('[data-bc]');
const previousOperandTextElement = document.querySelector('[data-previousOperand]');
const currentOperandTextElement = document.querySelector('[data-currentOperand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

num.forEach((n)=> {
    n.addEventListener('click', () => { 
        calculator.appendNumber(n.innerText);
        calculator.updateDisplay();
    })
})

operators.forEach((o) => {
    o.addEventListener('click', () => {
        calculator.chooseOperation(o.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', ()=> {
    calculator.compute();
    calculator.updateDisplay();
})

acBtn.addEventListener('click', ()=> {
    calculator.clear();
    calculator.updateDisplay();
})

delBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
