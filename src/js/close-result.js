import { refs } from './refs';
import { timer } from './timer';

refs.closeResultBtn.addEventListener('click', onCloseResultClick);

function onCloseResultClick(event) {
  refs.formWrapper.classList.remove('visually-hidden');
  refs.result.classList.add('visually-hidden');
  timer.stop();
  refs.years.textContent = '00';
  refs.months.textContent = '00';
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  refs.nick.textContent = 'Nickname';
  refs.avatar.src = './images/favicon.ico';
  refs.name.textContent = '';
  refs.location.textContent = '';
  refs.status.textContent = '';
  refs.status.classList.remove('result__status--newbie');
  refs.status.classList.remove('result__status--middle');
  refs.status.classList.remove('result__status--senior');
  refs.status.classList.remove('result__status--patriarch');
  refs.status.classList.remove('result__status--lord');
}
