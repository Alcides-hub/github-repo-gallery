// this is where your profile will appear.
const overview = document.querySelector(".overview");
const username = "Alcides-hub"; // this global variable sets the username of Github profile.
const repoList = document.querySelector(".repo-list")

const gitProfileInfo = async function () {  //this function will fetch data from github API by adding the user end point 
    const userInfo = await fetch (`https://api.github.com/users/${username}`); //fetches the API
    const data = await userInfo.json(); // resolves the JSON response
    displayUserInfo(data); //at the async function to fetch my github data, call the function displaying the user information and pass Json data as argument.
};

gitProfileInfo(); // call the function

const displayUserInfo = function (data) { //this function will pull information from my profile and display those data in the webpage.
    const div = document.createElement("div"); //this creates a new div element using createelement.
    div.classList.add("user-info"); // this adds a class called user-info in your HTML page 
    div.innerHTML = ` 
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`; // this populates the div with elements for figure, image, and paragraphs and you will input Json data in the placeholders.
    overview.append(div); //this appends the div to the overview class.
    gitRepos();
};

const gitRepos = async function () { //Async function to fetch my repos using Github API documentation.
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await fetchRepos.json(); // included the parameters using ? property and = symbol
    console.log(fetchRepos);
    displayEachRepo(data);
};

const displayEachRepo = function (repos) { // function that displays the repos you fetched using API, by looping through the repos data (not sure why they called it repos?), then created a list.
    for (let repo of repos) {
        const li = document.createElement("li"); // created a list element to appear as HTML code.
        li.classList.add("repo"); // added a class list called repo.
        li.innerHTML = `<h3>${repo.name}</h3>`; // add H3 element to the new list with the name of the repo.
        repoList.append(li); //Appended most important last line of code.
    }
}




