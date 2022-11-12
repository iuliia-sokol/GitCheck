// import { key } from './hide/key';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './searchByInput';

export const headers = {
  Accept: 'application/vnd.github.v3+json',
  // Authorization: `token ${key}`,
};
const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

export function fetchData(searchQuery) {
  const url = `https://api.github.com/users/${searchQuery}`;

  return fetch(url, { headers: headers }).then(response => {
    if (response.status === 404) {
      refs.spinner.classList.toggle('visually-hidden');
      Notify.failure(
        'Oops, this user does not seem to exist. Please check the login',
        notifySettings
      );
      return Promise.reject();
    }
    if (response.status === 403) {
      refs.spinner.classList.toggle('visually-hidden');
      Notify.warning(
        'Oops, you`ve exceeded the allowed number of requests. Please try again later',
        notifySettings
      );
      return Promise.reject();
    }
    return response.json();
  });
}
