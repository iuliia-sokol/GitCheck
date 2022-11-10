// import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

import { key } from './key';
const form = document.querySelector('.form');

console.log(key);

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;
  const url = `https://api.github.com/users/${searchQuery}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${key}`,
  };

  let user = {
    repos: [],
    login: searchQuery,
  };

  fetch(url, { headers: headers })
    .then(r => r.json())
    .then(data => {
      user = { ...user, ...data };
      return user;
    })
    .then(user => {
      fetch(`${user.repos_url}?per_page=100`, { headers: headers })
        .then(r => r.json())
        .then(repos => {
          // console.log(repos);
          user.repos = repos;
          return repos;
        })

        // .then(repos => {
        //   if (repos.length >= 100) {
        //     for (let i = 1; i < 571; i++) {
        //       let url = `${user.repos_url}?per_page=100?page=${i + 1}`;
        //       fetch(url, { headers: headers })
        //         .then(r => r.json())
        //         .then(data => {
        //           console.log(data);

        //           repos = [...user.repos, ...data];
        //           user.repos = repos;
        //           console.log(user.repos);
        //         });
        //       return user.repos;
        //     }
        //   }
        //   return user.repos;
        // })

        .then(repos => {
          console.log(user);
          for (let repo of repos) {
            let url = `${repo.url}/commits?per_page=100`;
            fetch(url, { headers: headers })
              .then(r => r.json())
              .then(commit => {
                let filteredData = [];
                commit.forEach(com => {
                  // console.log(com.author.login);
                  // console.log(user.id);
                  if (com.author.login === user.login) {
                    // console.log(com.author.login);

                    filteredData.push(com);
                    return filteredData;
                  }

                  return;
                });
                repo.commits = [...filteredData];
                return commit;
              })
              .then(commit => {
                if (commit.length >= 100) {
                  for (let i = 1; i < 571; i++) {
                    let url = `${repo.url}/commits?per_page=100?page=${i + 1}`;
                    fetch(url, { headers: headers })
                      .then(r => r.json())
                      .then(commit => {
                        let filteredData = [];
                        commit.forEach(com => {
                          if (com.author.id === user.id) {
                            // console.log(com.author.login);
                            filteredData.push(com);
                            return filteredData;
                          }
                          return filteredData;
                        });
                        repo.commits = [...repo.commits, ...filteredData];
                        // console.log(repo.commits);
                        return commit;
                      });
                    return;
                  }
                }
              });
          }
        });
    })
    .catch(er => console.error(er));
}
