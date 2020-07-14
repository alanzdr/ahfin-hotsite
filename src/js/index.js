document.addEventListener("DOMContentLoaded", function () {
  handleWithFormSubmit();
  handleWithInputsAnimations();
});

function handleWithFormSubmit() {
  const form = document.getElementById('content-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    return false;
  })
}

function handleWithInputsAnimations () {
  const inputs = document.querySelectorAll('.input-container');

  const setupInput = (inputContainer) =>  {
    const input = inputContainer.querySelector('input');
    const addEvents = (input) => {
      input.addEventListener('focus', (ev) => {
        inputContainer.classList.add("focus");
      })
      input.addEventListener('focusout', (ev) => {
        if (!input.value.length) {
          inputContainer.classList.remove("focus");
        }
      })
    }
    if (!input) {
      const select = inputContainer.querySelector('select');
      if (select) {
        addEvents(select);
      }
    } else {
      addEvents(input);
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    setupInput(inputs[i]);
  }
}