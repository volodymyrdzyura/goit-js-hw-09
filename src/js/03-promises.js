import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delayEl) {
  return new Promise((fulfill, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delayEl });
      } else {
        reject({ position, delayEl });
      }
    }, delayEl);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(refs.delayEl.value);
  let step = Number(refs.stepEl.value);
  let amount = Number(refs.amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delayEl }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delayEl}ms`);
      })
      .catch(({ position, delayEl }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delayEl}ms`);     
        });
        delay += step;
  }
}
