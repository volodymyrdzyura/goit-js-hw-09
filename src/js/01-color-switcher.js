import SimpleLightbox from 'simplelightbox';

const interval = 1000;
const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId = null;

buttonStart.addEventListener('click', onStartClick);

function onStartClick() {
  timerId = setInterval(changeColor, interval);
}

function changeColor() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.addEventListener('click', onStopClick);

function onStopClick() {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(timerId);
}
