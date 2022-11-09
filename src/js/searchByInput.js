// import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;
  const url = `https://api.github.com/users/${searchQuery}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'token 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',
  };

  let user = {
    login: searchQuery,
    repos: [],
  };

  fetch(url, { headers: headers })
    .then(r => r.json())
    .then(data => {
      user = { ...user, ...data };
      //   console.log(user.repos_url);

      fetch(user.repos_url, { headers: headers })
        .then(r => r.json())
        .then(repos => {
          user.repos = repos;
          for (let repo of user.repos) {
            let url = `${repo.url}/commits?per_page=100`;
            fetch(url, { headers: headers })
              .then(r => r.json())
              .then(commit => {
                console.log(commit);
                const filteredData = commit.filter(
                  commit => commit.author[login] === user.login
                );
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
                        const filteredData = commit.filter(
                          commit => commit.author.login === user.login
                        );
                        repo.commits = [...repo.commits, ...filteredData];
                        return commit;
                      });
                    return;
                  }
                }
              });
          }
          console.log(user.repos);
          return user;
        });
      return user;
    })
    .catch(er => console.error(er));
}
