import { refs } from './refs';

export function genValue(data, prop) {
  if (prop === 'repo') {
    refs.repos.style.setProperty('--repo', data);
  }

  if (prop === 'followers') {
    refs.followers.style.setProperty('--num1', data);
  }

  if (prop === 'following') {
    refs.following.style.setProperty('--num2', data);
  }
}

export function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = timestamp => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
