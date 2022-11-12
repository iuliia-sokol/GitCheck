// import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

import { fetchData, headers } from './fetch';
import { timer } from './timer';

export const refs = {
  form: document.querySelector('.form'),
  spinner: document.querySelector('.spinner'),
  nick: document.querySelector('[data-nick]'),
  avatar: document.querySelector('[data-avatar]'),
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
  refs.spinner.classList.remove('visually-hidden');
  fetchData(searchQuery)
    .then(data => {
      let user = {
        repos: [],
        login: searchQuery,
      };
      user = { ...user, ...data };
      refs.spinner.classList.toggle('visually-hidden');
      refs.nick.textContent = data.login;
      refs.avatar.src = data.avatar_url;
      refs.name.textContent = data.name;
      if (data.name === null) {
        refs.name.textContent = 'Anonymous';
      }
      refs.followers.textContent = data.followers;
      refs.following.textContent = data.following;
      refs.location.textContent = data.location;
      if (data.location === null) {
        refs.location.textContent = 'Planet Earth';
      }
      refs.repos.textContent = data.public_repos;
      // console.log();
      const term = +refs.years.textContent;

      if (term <= 0) {
        refs.status.textContent = 'Newbie';
      }
      if (term >= 1 && term <= 2) {
        refs.status.textContent = 'Middle';
      }
      if (term >= 3 && term <= 5) {
        refs.status.textContent = 'Senior';
      }
      if (term >= 6 && term <= 10) {
        refs.status.textContent = '';
      } else {
        refs.status.textContent = 'Git-God';
      }

      const date = Date.parse(data.created_at);
      timer.start(date);

      console.log(user);
      return user;
    })

    // GET REPOS

    // .then(user => {
    //        console.log(user);
    //        console.log(repos);
    //   fetch(`${user.repos_url}?per_page=100`, { headers: headers })
    //     .then(r => r.json())
    //     .then(repos => {
    //       console.log(user);
    //       console.log(repos);
    //       user.repos = repos;
    //       return repos;
    //     });

    // TO GET COMMITS

    // .then(repos => {
    //   console.log(user);
    //   for (let repo of repos) {
    //     let url = `${repo.url}/commits?per_page=100`;
    //     fetch(url, { headers: headers })
    //       .then(r => r.json())
    //       .then(commit => {
    //         let filteredData = [];
    //         commit.forEach(com => {
    //           // console.log(com.commit);
    //           // console.log(com.author.login);
    //           // console.log(user.id);
    //           if (com.author == null) {
    //             return;
    //           }

    //           if (
    //             com.author.id === user.id ||
    //             com.author.login === user.login ||
    //             com.commit.author.login === user.login ||
    //             com.commit.author.name === user.name ||
    //             com.commit.author.email === user.email
    //           ) {
    //             // console.log(com.author.login);

    //             filteredData.push(com);
    //             return filteredData;
    //           }

    //           return;
    //         });
    //         repo.commits = [...filteredData];
    //         return commit;
    //       })
    //       .then(commit => {
    //         if (commit.length >= 100) {
    //           for (let i = 1; i < 571; i++) {
    //             let url = `${repo.url}/commits?per_page=100?page=${i + 1}`;
    //             fetch(url, { headers: headers })
    //               .then(r => r.json())
    //               .then(commit => {
    //                 let filteredData = [];
    //                 commit.forEach(com => {
    //                   // if (com.author == null) {
    //                   //   return;
    //                   // }

    //                   if (
    //                     com.author.id === user.id ||
    //                     com.author.login === user.login ||
    //                     com.commit.author.login === user.login ||
    //                     com.commit.author.name === user.name ||
    //                     com.commit.author.email === user.email
    //                   ) {
    //                     // console.log(com.author.login);
    //                     filteredData.push(com);
    //                     return filteredData;
    //                   }
    //                   return filteredData;
    //                 });
    //                 repo.commits = [...repo.commits, ...filteredData];
    //                 // console.log(repo.commits);
    //                 return commit;
    //               });
    //             return;
    //           }
    //         }
    //       });
    //   }
    // });

    // })
    .catch(er => console.error(er));
  refs.form.reset();
}
