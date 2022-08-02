// this is where your profile will appear.
const overview = document.querySelector(".overview");
const username = "Alcides-hub"; // this global variable sets the username of Github profile.

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
};
