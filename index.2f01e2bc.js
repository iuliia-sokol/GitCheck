const e=document.querySelector(".form");console.log("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"),e.addEventListener("submit",(function(e){e.preventDefault();const t=e.currentTarget.elements.input.value,o={Accept:"application/vnd.github.v3+json",Authorization:"token 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"};let n={repos:[],login:t};fetch(`https://api.github.com/users/${t}`,{headers:o}).then((e=>e.json())).then((e=>(n={...n,...e},n))).then((e=>{fetch(`${e.repos_url}?per_page=100`,{headers:o}).then((e=>e.json())).then((t=>(e.repos=t,t))).then((t=>{console.log(e);for(let n of t){let t=`${n.url}/commits?per_page=100`;fetch(t,{headers:o}).then((e=>e.json())).then((t=>{let o=[];return t.forEach((t=>{if(t.author.login===e.login)return o.push(t),o})),n.commits=[...o],t})).then((t=>{if(t.length>=100)for(let t=1;t<571;t++){let r=`${n.url}/commits?per_page=100?page=${t+1}`;return void fetch(r,{headers:o}).then((e=>e.json())).then((t=>{let o=[];return t.forEach((t=>t.author.id===e.id?(o.push(t),o):o)),n.commits=[...n.commits,...o],t}))}}))}}))})).catch((e=>console.error(e)))}));
//# sourceMappingURL=index.2f01e2bc.js.map
