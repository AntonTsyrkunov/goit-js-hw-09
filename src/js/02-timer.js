import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const timerEls = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const counterStartBtn = document.querySelector('[data-start]');

const calendarInput = document.querySelector('#datetime-picker');

let timerId;

counterStartBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  currentDate: new Date(),
  minuteIncrement: 1,
  onClose(chousenDate) {
    if (chousenDate[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      counterStartBtn.disabled = false;
      counterStartBtn.addEventListener('click', handleTimerCount);
    }
  },
};

flatpickr(calendarInput, options);
const handleTimerCount = () => {
  counterStartBtn.disabled = true;
  timerId = setInterval(() => {
    const chousenDate = new Date(calendarInput.value).getTime();
    const currentTime = new Date().getTime();
    const counterTime = chousenDate - currentTime;
    const counterTimeMs = convertMs(counterTime);
    for (let elem in counterTimeMs) {
      timerEls[elem].textContent =
        counterTimeMs[elem].toString().padStart(2, '0');
    }
    if (counterTime < 1000) {
      clearInterval(timerId);
      counterStartBtn.disabled = false;
    }
  }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}