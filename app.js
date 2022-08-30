const APIURL = "https://api.github.com/users/";
let main = document.querySelector(".container");
let form = document.getElementById("form");
let search = document.getElementById("search");
function getUser(username) {
  let name = username.split(" ").join("");
  fetch(APIURL + name)
    .then((response) => response.json())
    .then((data) => {
      createUserCard(data);
      getRepos(username);
      //   if(name == undefined) {
      //     createErrorCard("Not Found")
      //   }
    });
}
function getRepos(username) {
  let name = username.split(" ").join("");
  fetch(APIURL + name + "/repos?sort=created")
    .then((res) => res.json())
    .then((data) => {
      addReposToCard(data);
    });
}
function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
<div class="card">
<div>
<a href=${"https://github.com/" + user.login}>
<img src="${user.avatar_url}" alt="${user.name}" class="avatar">
</a>
</div>
<div class="user-info">
<a href=${"https://github.com/" + user.login}>
<h2>${userID}</h2>
</a>
${userBio}
<ul class="user-details">
<li>${user.followers} <strong>Followers</strong></li>
<li>${user.following} <strong>Following</strong></li>
<li>${user.public_repos} <strong>Repos</strong></li>
</ul>
<div id="repos"></div>
</div>
</div>
`;
  main.innerHTML = cardHTML;
}
// function createErrorCard(msg) {
//   const errCardHTML = `
// <div class="card">
// <h1>${msg}</h1>
// </div>
// `;
//   main.innerHTML = errCardHTML;
// }
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
