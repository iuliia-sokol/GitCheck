// import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

import { fetchData } from './fetch';

export const refs = {
  form: document.querySelector('.form'),
  spinner: document.querySelector('.spinner'),
  nick: document.querySelector('[data-nick]'),
  name: document.querySelector('[data-name]'),
  status: document.querySelector('[data-status]'),
  location: document.querySelector('[data-location]'),
  following: document.querySelector('[data-following]'),
  followers: document.querySelector('[data-followers]'),
  years: document.querySelector('[data-years]'),
  months: document.querySelector('[data-months]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  repos: document.querySelector('[data-repos]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;
  timer.start();
  // console.dir(refs.spinner);
  refs.spinner.classList.remove('visually-hidden');
  fetchData(searchQuery);
}
