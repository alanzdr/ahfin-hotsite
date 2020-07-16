document.addEventListener("DOMContentLoaded", function () {
  handleWithFormSubmit();
  handleWithInputsAnimations();
});

function fetchSend (url, data, cb) {
  setTimeout(cb, 2000);
  // if ("fetch" in window) {
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(cb)
  //     .catch(err => {
  //       console.log(err);
  //     })
  // } else {
  //   const req = new XMLHttpRequest();
  //   req.open('POST', url, false);
  //   req.setRequestHeader("Content-Type", "application/json");
  //   req.onload = cb;
  //   req.send(JSON.stringify(data));
  // }
}

function getSearchParams () {
  const querys = {};
  const queryString = window.location.search;

  if ('URLSearchParams' in window) {
    const urlParams = new URLSearchParams(queryString);
    const keys = urlParams.keys();
    for (const key of keys) {
      const value = urlParams.get(key);
      if (value) {
        querys[key] = value;
      }
    };
  }

  return querys;
}



function handleWithFormSubmit() {
  const form = document.getElementById('content-form');
  const formSubmit = form.querySelector('button');
  const params = getSearchParams();

  const onGetData = () => {
    const data = {};
    if(form){
      const elements = form.elements;
      for ( var x = 0; x < elements.length; x++ ) {
        const input = elements[x];
        if (input.type != 'submit') {
          let key = "";
          if (input.name)
            key = input.name
          data[key] = input.value;
        }
      }
    }
    return data;
  }

  const getUTM = () => {
    const utm = {};
    if (params.utm_source) {
      utm.traffic_source = params.utm_source;
    }
    if (params.utm_medium) {
      utm.traffic_medium = params.utm_medium;
    }
    if (params.utm_campaign) {
      utm.traffic_campaign = params.utm_campaign;
    }
    if (params.utm_term) {
      utm.traffic_value = params.utm_term;
    }  
    return utm;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = onGetData();
    const url = "https://www.rdstation.com.br/api/1.3/conversions";
    const rdInfo = {
      token_rdstation: "",
      identificador: '',
      origem: window.location.href,
    }

    const utm = getUTM();

    const data = {
      ...rdInfo,
      ...utm,
      ...formData,
    }

    formSubmit.setAttribute('disabled', true);

    fetchSend(url, data, () => {
      formSubmit.removeAttribute('disabled');
      const { protocol, host, pathname } = window.location;
      const link = `${protocol}//${host}${pathname}obrigado`
      window.location.href = link;
    })

    return false;
  }

  form.addEventListener('submit', onSubmit)
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