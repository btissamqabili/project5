const testUsers = [
    {
        id: 1,
        login: "torvalds",
        name: "Linus Torvalds",
        avatar_url: "https://avatars.githubusercontent.com/u/1024588?v=4",
        bio: "Linux creator",
        followers: 200000,
        following: 0,
        public_repos: 50
    },
    {
        id: 2,
        login: "gvanrossum",
        name: "Guido van Rossum",
        avatar_url: "https://avatars.githubusercontent.com/u/6490553?v=4",
        bio: "Python creator",
        followers: 50000,
        following: 50,
        public_repos: 30
    }
];
const testRepos = [
    {
        name: "linux",
        description: "Linux kernel",
        language: "C",
        stargazers_count: 15000,
        forks_count: 2000,
        html_url: "https://github.com/torvalds/linux"
    },
    {
        name: "cpython",
        description: "Python interpreter",
        language: "C",
        stargazers_count: 50000,
        forks_count: 23000,
        html_url: "https://github.com/python/cpython"
    }
];


const state = {
    currentUser: null,
    bookmarks: [],
    isViewingBookmarks: false
};

const searchInput = document.getElementById("username");
const searchBtn = document.getElementById("search-btn");

const profile = document.getElementById("profile");
const repositories = document.getElementById("repositories");

const welcomeSection = document.getElementById("section-bienvenue");
const loadingSection = document.getElementById("section-chargement");
const errorSection = document.getElementById("section-error");

function hideAll() {
    welcomeSection.classList.add("hidden");
    loadingSection.classList.add("hidden");
    errorSection.classList.add("hidden");
    profile.classList.add("hidden");
    repositories.classList.add("hidden");
}

function showWelcome() {
    hideAll();
    welcomeSection.classList.remove("hidden");
}

function showLoading() {
    hideAll();
    loadingSection.classList.remove("hidden");
}

function showError(message) {
    hideAll();
    errorSection.classList.remove("hidden");
    document.getElementById("error-message").textContent = message;
}

function displayUserProfile(user) {
    hideAll();

    document.getElementById("avatar").src = user.avatar_url;
    document.getElementById("name").textContent = user.name;
    document.getElementById("login").textContent = "@" + user.login;
    document.getElementById("bio").textContent = user.bio;
    document.getElementById("followers").textContent = user.followers;
    document.getElementById("following").textContent = user.following;
    document.getElementById("repos").textContent = user.public_repos;
    document.getElementById("github-link").href =
        "https://github.com/" + user.login;

    profile.classList.remove("hidden");

    displayRepositories(testRepos);
}

function displayRepositories(repos) {
    repositories.innerHTML = "<h2>Top Repositories</h2>";
    repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");
    repoCard.innerHTML = `
    <div class="repo-top">
         <h3>${repo.name}</h3>
     <span>⭐ ${repo.stargazers_count}</span>
    </div>
    <p>${repo.description}</p>
    <small>
    📄 ${repo.language}
    &nbsp;&nbsp;
   🍴 ${repo.forks_count}
            </small>
        `;
        repositories.appendChild(repoCard);
    });

    repositories.classList.remove("hidden");
}


function searchUserLocal(username) {
    showLoading();

    setTimeout(() => {
        const searchValue = username.toLowerCase().trim();

        const user = testUsers.find(
            (u) =>
         u.login.toLowerCase() === searchValue ||
        u.name.toLowerCase() === searchValue
        );

        if (!user) {
         showError("Utilisateur non trouvé");
        return;
        }
        state.currentUser = user;
        displayUserProfile(user);
    }, 1000);
}
function handleSearch() {
    const username = searchInput.value.trim();
    if (!username) {
    showError("Veuillez entrer un nom d'utilisateur");
    return;
    }
    searchUserLocal(username);
}
searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});
document.addEventListener("DOMContentLoaded", showWelcome);