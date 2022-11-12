// import { key } from './hide/key';
import { refs } from './searchByInput';

export function fetchData(searchQuery) {
  const url = `https://api.github.com/users/${searchQuery}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    // Authorization: `token ${key}`,
  };

  let user = {
    repos: [],
    login: searchQuery,
  };

  fetch(url, { headers: headers })
    .then(r => r.json())
    .then(data => {
      user = { ...user, ...data };
      refs.spinner.classList.toggle('visually-hidden');
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
}
