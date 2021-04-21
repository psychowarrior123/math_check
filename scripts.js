const form = document.querySelector('form');
const expressionInput = document.querySelector('#expression');
const answerInput = document.querySelector('#answer');
const btnGroup = document.querySelector('.btn-group');
const buttons = btnGroup.querySelectorAll('button');

const state = {
  expression: '',
  result: '',
};

const operands = ['+', '-', '%C3%97', '%C3%B7'];

const switcher = {
  '+': '+',
  '-': '-',
  '%C3%97': '*',
  '%C3%B7': '/',
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answer = formData.get('answer');
  const validExpression = state.expression.split('').map((item) => {
    const encoded = encodeURI(item);
    if (operands.indexOf(encoded) !== -1) {
      return switcher[encoded];
    }
    return item;
  }).join('');
  state.result = eval(validExpression);
  if (state.result === Number(answer)) {
    answerInput.classList.remove('is-invalid');
    answerInput.classList.add('valid');
  } else {
    answerInput.classList.remove('valid');
    answerInput.classList.add('is-invalid');
  }
  answerInput.focus();
  console.log(state)
})
  
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    expressionInput.value += e.target.innerText;
    expressionInput.focus();
  });
});

expressionInput.addEventListener('input', (e) => {
  state.expression = e.target.value;
  console.log(state)
})