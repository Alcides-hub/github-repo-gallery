// this is where your profile will appear.
const overview = document.querySelector(".overview");
const username = "Alcides-hub"; // this global variable sets the username of Github profile.
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos"); //all repos information will be located here.
const singleRepo = document.querySelector(".repo-data"); //individual repo will appear here
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
        filterInput.classList.remove("hide");
        const li = document.createElement("li"); // created a list element to appear as HTML code.
        li.classList.add("repo"); // added a class list called repo.
        li.innerHTML = `<h3>${repo.name}</h3>`; // add H3 element to the new list with the name of the repo.
        repoList.append(li); //Appended most important last line of code.
    }
};

repoList.addEventListener("click", function(e) { //click event for the unordered list with a class of "repo-list"
    if (e.target.matches("h3")) { // add an if statement to check if event target matches H3 element.
        const repoName = e.target.innerText; // target the innertex where the event happens.
        specificUserInfo(repoName); // call to async function passing reponame as arguement. Now you can see if the specific objects about the repo.
    }
});

const specificUserInfo = async function (repoName) { //create a function to get specific repo information that accepts reponame as a parameter
    const grabRepoSpec = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //make a fetch request to grab information about specific repository.
    const repoInfo = await grabRepoSpec.json(); //resolve and save json response.
    console.log(repoInfo); 
    const fetchLanguages = await fetch(repoInfo.languages_url); //create a variable to fetch once language_url property of your portfolio.
    const languageData = await fetchLanguages.json(); //create a variable to save the JSON response.
    console.log(languageData); //log out the language data, you can now click on the repo and check the language data.
     
    const languages = []; // now you have the languages for your repo. Add each language to an empty array called languages.
    for (const language in languageData) { //loop through languageData to add languages to the end of the array. Why?
        languages.push(language);
        console.log(languages); //now you should see your array show up on the page.
    }
specificRepoInfo(repoInfo, languages); //call the function specificRepoInfo and pass both arguments in the array.

};
    const specificRepoInfo = function(repoInfo, languages) { //create a function to get specific repo information.
        singleRepo.innerHTML = ""; //empty thr HTML of the section where the individual repo data will appear.
        singleRepo.classList.remove("hide"); //unhide the repo-data element.
        allRepos.classList.add("hide"); //hide the element with class repos.
        const div = document.createElement("div");
        // div.classList.add(".repository-info"); no need to add a class.
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
        //add the selected repository name, description, default branch, and links to its code on github.
        // div.append(".repo-data")
        singleRepo.append(div); //append the new div element to the section.
        backToRepo.classList.remove("hide");
};

backToRepo.addEventListener("click", function () {
    allRepos.classList.remove("hide");
    singleRepo.classList.add("hide");
    backToRepo.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    console.log(searchText);
    const allVariables = document.querySelectorAll(".repo");
    const lowerCase = searchText.toLowerCase();
    
    for (const repo of allVariables) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(lowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});





