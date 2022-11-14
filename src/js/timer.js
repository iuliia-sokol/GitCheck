import { refs } from './refs';

export const timer = {
  intervalID: null,
  start(startTimer) {
    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTimer;
      const { years, months, days, hours, minutes, seconds } =
        convertMs(deltaTime);
      refs.years.textContent = `${years}`;
      // refs.years.dataset.years = `${years}`;
      refs.months.textContent = `${months}`;
      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.minutes.textContent = `${minutes}`;
      refs.seconds.textContent = `${seconds}`;

      const term = +refs.years.textContent;

      if (term <= 0) {
        refs.status.textContent = 'Newbie';
        refs.status.classList.add('result__status--newbie');
      }
      if (term >= 1 && term <= 2) {
        refs.status.textContent = 'Middle';
        refs.status.classList.add('result__status--middle');
      }
      if (term >= 3 && term <= 5) {
        refs.status.textContent = 'Senior';
        refs.status.classList.add('result__status--senior');
      }
      if (term >= 6 && term <= 9) {
        refs.status.textContent = 'Patriarch';
        refs.status.classList.add('result__status--patriarch');
      }
      if (term > 10) {
        refs.status.textContent = 'Lord of Git';
        refs.status.classList.add('result__status--lord');
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalID);

    return;
  },
};

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
