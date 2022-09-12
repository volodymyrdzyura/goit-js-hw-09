import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', getValue);

function getValue(event) {
  event.preventDefault();
  const delay = delayEl.value;
  const step = stepEl.value;
  const amount = amountEl.value;

  for (let position = 1; position <= amount; position += 1) {
    // function createPromise(position, delay){
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const intevalID = setInterval(() => {
          if (position == amount) {
            clearInterval(intevalID);
          }
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
          } else {
            reject(`❌ Rejected promise ${position} in ${delay}ms`);
          }
        }, step);
      }, delay);
    });
 

    promise
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.warning(error);
      });
  }
}