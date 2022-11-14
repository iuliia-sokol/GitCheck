import { fetchData } from './fetch';
import { timer } from './timer';
import { refs } from './refs';
import { animateValue } from './animate-value';
import { genValue } from './animate-value';

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;
  refs.spinner.classList.remove('visually-hidden');
  fetchData(searchQuery)
    .then(data => {
      refs.formWrapper.classList.add('visually-hidden');
      refs.result.classList.remove('visually-hidden');
      refs.footer.classList.add('footer--up')
      let user = {
        repos: [],
        login: searchQuery,
      };
      user = { ...user, ...data };
      refs.spinner.classList.toggle('visually-hidden');
      const date = Date.parse(data.created_at);
      timer.start(date);
      refs.nick.textContent = data.login;
      refs.avatar.src = data.avatar_url;
      refs.name.textContent = data.name;

      if (data.name === null) {
        refs.name.textContent = 'Anonymous';
      }

      refs.location.textContent = data.location;
      if (data.location === null) {
        refs.location.textContent = 'Planet Earth';
      }

      genValue(data.followers, 'followers');
      genValue(data.following, 'following');
      genValue(data.public_repos, 'repo');
      const members = data.id - 1;
      animateValue(refs.members, 0, members, 1000);
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
