let container = document.querySelector('.container');
const form = document.querySelector('#form');
form.addEventListener('submit' , e => {
    e.preventDefault();
    document.querySelector('.container').style.visibility = "visible";
    let searchName = document.querySelector('#search').value;
    let name = searchName.split(' ').join('');
    fetch('https://api.github.com/users/'+name)
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    if(data.message == "Not Found"){
        console.log('Not Found')
    }
    if(searchName == ""){
        alert('Please enter user name')
    }
    document.querySelector('#search').value = '';
    let userDetails;
    const icon = (data.avatar_url);
    userDetails = `
    <div class="all-items">
    <img src="${icon}" class="avatar">
    <h1 class="username">${data.login}</h1>
    <div class="list">
    <a href="${data.html_url}" target="_blank"><l1> ${data.followers} Followers</li></a>
    <a href="${data.html_url}" target="_blank"><l1> ${data.following} Following</li></a>
    <a href="#" target="_blank"><l1> ${data.public_repos} Repos</li></a>
    <a href="${data.html_url}" target="_blank"><l1>View Repository</li></a>
    </div>
    </div>
    `
    container.innerHTML = userDetails;
   })
});