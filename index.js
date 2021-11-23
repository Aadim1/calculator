const buttonDOM = document.querySelectorAll('.btn');
const backspaceButton = document.querySelector('.btn-backspace');
const buttonOperators = document.querySelectorAll('.btn-op')
const clearButton = document.querySelector('.btn-clear');
const inputDOM = document.getElementById('input');
const equalButton = document.querySelector('.btn-equal')
const up = document.querySelector('.up')
let inputString = '';

const division = (divide) => {
    let splitter = divide.split('/');
    const divider = (previousValue, currentValue) => previousValue / currentValue;
    return splitter.reduce(divider);
}

const multiplication = (multiply) => {
    const multiplier = (previousValue, currentValue) => previousValue * currentValue;
    let splitter = multiply.split('x');
    splitter.forEach((number) => {
        if (number.includes('/')) {
            splitter[splitter.indexOf(number)] = division(number);
        }
    })
    return splitter.reduce(multiplier);
}

const substraction = (subtract) => {
    const subtracter = (previousValue, currentValue) => previousValue - currentValue;
    let splitter = subtract.split('-');
    splitter.forEach((number) => {
        if (number.includes('x')) {
            splitter[splitter.indexOf(number)] = multiplication(number);
        } else if (number.includes('/')) {
            splitter[splitter.indexOf(number)] = division(number);
        }
    });
    return splitter.reduce(subtracter);
}

const addition = (add) => {
    const adder = (previousValue, currentValue) => parseFloat(currentValue) + parseFloat(previousValue);
    let splitter = add.split('+');
    console.log(splitter)
    splitter.forEach((number) => {
        if (number.includes('-')) {
            splitter[splitter.indexOf(number)] = substraction(number);
        } else if (number.includes('x')) {
            splitter[splitter.indexOf(number)] = multiplication(number);
        } else if (number.includes('/')) {
            splitter[splitter.indexOf(number)] = division(number);
        }
        console.log(splitter)
    });
    inputDOM.value = splitter.reduce(adder);
    up.innerHTML = `${inputString} = `
}

buttonOperators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        var operator_ = btn.innerHTML;
        inputDOM.value += `${operator_}`;
    });
});

buttonDOM.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        inputDOM.value += `${btn.innerHTML}`;
    });
});

backspaceButton.addEventListener('click', (e) => {
    inputDOM.value = (inputDOM.value).slice(0, -1);
});

clearButton.addEventListener('click', () => {
    inputDOM.value = '';
    up.style.removeProperty('transition-duration')
    up.style.visibility = 'hidden';
    up.style.transform = "translateY(15px)";
});

inputDOM.addEventListener('input', (e) => {});

equalButton.addEventListener('click', () => {
    inputString = inputDOM.value;
    inputDOM.value = '';
    up.style.visibility = 'visible';
    up.style['transition-duration'] = '0.4s';
    up.style.transform = "translateY(-25px)";
    addition(inputString);
    inputDOM.style.removeProperty('transition-duration');
    inputString = '';
});