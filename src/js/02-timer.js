// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// const flatpickr = require('flatpickr');

const calendar = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const label = document.querySelectorAll('.label');
const value = document.querySelectorAll('.value');
const sec = document.querySelector('[data-seconds]');
const min = document.querySelector('[data-minutes]');
const hr = document.querySelector('[data-hours]');
const dy = document.querySelector('[data-days]');
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// ------------------------------------------------------------візуальне оформлення лічильника------------------------
timer.style.display = 'flex';

for (let key of value) {
  key.style.fontSize = '30px';
}

for (let key of field) {
  key.style.marginRight = '20px';
  key.style.textAlign = 'center';
}

for (let key of label) {
  key.style.display = 'block';
}
// ------------------------------------------------------робота з календарем-------------------------------
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const choosenTime = selectedDates[0].getTime();
    const currentTime = Date.now();
    if (currentTime > choosenTime) {
      //--------- перевірка на правильність вибору дати
      window.alert('Please choose a date in the future'); //---- модалка кщо невірна дата
      return;
    }
    buttonStart.disabled = false; //---------активація кнопки
    
    buttonStart.addEventListener('click', function setTime() {
      buttonStart.disabled = true; //-------кнопка стане активна після вибору правильної дати
      const timeCounter = {
        start() {
          const intervalId = setInterval(() => {
            const currentTime = Date.now();
            let difference = choosenTime - currentTime;
            const clockTime = convertMs(difference);
            //-----умова припинення роботи лічильника
            if (difference < 999) {
              clearInterval(intervalId);
              dy.textContent = '00'; //------Запобіжник, який виправляє баг із мінусовими цифрами якщо після досягнення 00:00:00 натиснути кнопку start
              hr.textContent = '00';
              min.textContent = '00';
              sec.textContent = '00';
              return;
            }
          }, 1000);

          function convertMs(ms) {
            //--------------------ф-я формування часу ХХ:ХХ:ХХ
            const days = Math.floor(ms / day);
            const hours = Math.floor((ms % day) / hour);
            const minutes = Math.floor(((ms % day) % hour) / minute);
            const seconds = Math.floor((((ms % day) % hour) % minute) / second);

            function addLeadingZero(days, hours, minutes, seconds) {
              return days.toString().padStart(2, 0);
              hours.toString().padStart(2, 0);
              minutes.toString().padStart(2, 0);
              seconds.toString().padStart(2, 0);
            }

            dy.textContent = addLeadingZero(days);
            hr.textContent = addLeadingZero(hours);
            min.textContent = addLeadingZero(minutes);
            sec.textContent = addLeadingZero(seconds);

            return { days, hours, minutes, seconds };
          }
        },
      };
      timeCounter.start();
    });
  },
};

flatpickr(calendar, options);