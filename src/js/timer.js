import { refs } from './searchByInput';

const date = Date.now();
let setDate = {};

const timer = {
  intervalID: null,
  start(date) {
    const startTimer = date;

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTimer - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      if (deltaTime <= 1000) {
        this.stop();
      }
      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.minutes.textContent = `${minutes}`;
      refs.seconds.textContent = `${seconds}`;
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalID);

    return;
  },
};

let diff = Date.now() - Date.parse('July 3, 2005');

function convertMs(ms) {
  let seconds = Math.floor(ms / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds = addLeadingZero((seconds %= 60));
  minutes = addLeadingZero((minutes %= 60));
  hours = addLeadingZero((hours %= 24));
  days = addLeadingZero((days %= 30));
  months = addLeadingZero((months %= 12));
  years = addLeadingZero(years);

  return { years, months, days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(convertMs(diff));
