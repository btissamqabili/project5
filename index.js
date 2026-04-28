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
const rechercheinput = document.getElementById('username');
const rechercheBtn = document.getElementById('search-btn');
const userProfile = document.getElementById('profile');
const listerepos = document.getElementById('repositories');
const bienvenue = document.getElementById('section-bienvenue');
const loadingState = document.getElementById('section-chargement');
const errorState = document.getElementById('section-error');
const bookmarksList = document.getElementById('liste-favorites');
const favoritcount = document.getElementById('favorites-count');
function hideAll() {
    bienvenue.classList.add("hidden");
    loadingState.classList.add("hidden");
    errorState.classList.add("hidden");
    userProfile.classList.add("hidden");
    listerepos.classList.add("hidden");
}
function showWelcome() {
    hideAll();
    bienvenue.classList.remove("hidden");
}

function showLoading() {
    hideAll();
    loadingState.classList.remove("hidden");
}fhjg
function showError(message) {
    hideAll();
    errorState.classList.remove("hidden");
    document.getElementById("error-message").textContent = message;
}
function displayUserProfile(user) {
    hideAll();
    document.getElementById("avatar").src = user.avatar_url;
    document.getElementById("name").textContent = user.name || "Nom indisponible";
    document.getElementById("login").textContent = "@" + user.login;
    document.getElementById("bio").textContent = user.bio || "Aucune biographie";
    document.getElementById("followers").textContent = user.followers;
    document.getElementById("following").textContent = user.following;
    document.getElementById("repos").textContent = user.public_repos;
    document.getElementById("github-link").href = "https://github.com/" + user.login;
    userProfile.classList.remove("hidden");
    displayRepositories(testRepos);
}cb
function displayRepositories(repos) {
    listerepos.innerHTML = "<h2>Top Repositories</h2>";
    repos.forEach(repo => {
     const repoCard = document.createElement("div");
     repoCard.classList.add("repo-card");
      repoCard.innerHTML = `
     <div class="repo-top">
    <h3>${repo.name}</h3>
    <span>⭐ ${repo.stargazers_count}</span>
    </div>
     <p>${repo.description || "No description"}</p>
     <small>
      📄 ${repo.language || "Unknown"}
         &nbsp;&nbsp;
        🍴 ${repo.forks_count}
        </small>
        `;
        listerepos.appendChild(repoCard);
    });
    listerepos.classList.remove("hidden");
}
function searchUserLocal(username) {
    showLoading();
    setTimeout(() => {
      const user = testUsers.find(
          u => u.login.toLowerCase() === username.toLowerCase()
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
    const username = rechercheinput.value.trim();
    if (!username) {
        showError("Veuillez entrer un nom d'utilisateur");
        return;
    }
    searchUserLocal(username);
}
rechercheBtn.addEventListener('click', handleSearch);
rechercheinput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
});
document.addEventListener("DOMContentLoaded", () => {
    showWelcome();
});