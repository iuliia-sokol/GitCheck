document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const t=e.currentTarget.elements.input.value,o={Accept:"application/vnd.github.v3+json"};let n={repos:[],login:t};fetch(`https://api.github.com/users/${t}`,{headers:o}).then((e=>e.json())).then((e=>(n={...n,...e},n))).then((e=>{fetch(`${e.repos_url}?per_page=100`,{headers:o}).then((e=>e.json())).then((t=>(console.log(e),console.log(t),e.repos=t,t))).then((t=>{console.log(e);for(let n of t){let t=`${n.url}/commits?per_page=100`;fetch(t,{headers:o}).then((e=>e.json())).then((t=>{let o=[];return t.forEach((t=>{if(null!=t.author)return t.author.id===e.id||t.author.login===e.login||t.commit.author.login===e.login||t.commit.author.name===e.name||t.commit.author.email===e.email?(o.push(t),o):void 0})),n.commits=[...o],t})).then((t=>{if(t.length>=100)for(let t=1;t<571;t++){let r=`${n.url}/commits?per_page=100?page=${t+1}`;return void fetch(r,{headers:o}).then((e=>e.json())).then((t=>{let o=[];return t.forEach((t=>t.author.id===e.id||t.author.login===e.login||t.commit.author.login===e.login||t.commit.author.name===e.name||t.commit.author.email===e.email?(o.push(t),o):o)),n.commits=[...n.commits,...o],t}))}}))}}))})).catch((e=>console.error(e)))}));
//# sourceMappingURL=index.413c919b.js.map
