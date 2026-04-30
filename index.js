
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
const favoritesBtn = document.getElementById("favorites-btn");
const favoritesCount = document.getElementById("favorites-count");
const favoritesSection = document.getElementById("section-favorites");
const favoritesList = document.getElementById("liste-favorites");

function hideAll() {
    welcomeSection.classList.add("hidden");
    loadingSection.classList.add("hidden");
    errorSection.classList.add("hidden");
    profile.classList.add("hidden");
    repositories.classList.add("hidden");
    favoritesSection.classList.add("hidden");
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
async function fetchUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
         Authorization: `token ${env.Token}`
        }
    });
    if (!res.ok) {
        throw new Error("Utilisateur non trouvé");
    }
    return await res.json();
}
async function fetchUserRepos(username){
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`,
        {
            headers: {
            Authorization: `token ${env.Token}`
            }
        }
    );
    if (!res.ok) {
        throw new Error("Erreur chargement repositories");
    }
    return await res.json();
}
function displayUserProfile(user) {
    hideAll();

    document.getElementById("avatar").src = user.avatar_url;
    document.getElementById("name").textContent = user.name || "No name";
    document.getElementById("login").textContent = "@" + user.login;
    document.getElementById("bio").textContent = user.bio || "No bio";
    document.getElementById("followers").textContent = user.followers;
    document.getElementById("following").textContent = user.following;
    document.getElementById("repos").textContent = user.public_repos;
    document.getElementById("github-link").href = user.html_url;
    profile.classList.remove("hidden");

    renderBookmarkButton(user);
}
function displayRepositories(repos) {
    repositories.innerHTML = "";

    repos.forEach((repo) => {
        const div = document.createElement("div");
        div.className = "repo-card";

        div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "pas de description"}</p>
        <small>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</small>
        `;
        repositories.appendChild(div);
    });
    repositories.classList.remove("hidden");
}
async function handleSearch() {
    const username = searchInput.value.trim();
    if (!username) {
    showError("Champ vide");
    return;
    }
    try {
     showLoading();
    const user = await fetchUser(username);
    const repos = await fetchUserRepos(username);
    state.currentUser = user;
    displayUserProfile(user);
     displayRepositories(repos);

    } catch (err) {
        showError(err.message);
    }
}
function saveBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    updateFavoritesCount();
}
function updateFavoritesCount() {
    favoritesCount.textContent = state.bookmarks.length;
}
function isBookmarked(user) {
    return state.bookmarks.some(b => b.login === user.login);
}
function toggleBookmark(user) {
    const exists = isBookmarked(user);
    if (exists) {
        state.bookmarks = state.bookmarks.filter(b => b.login !== user.login);
    } else {
        state.bookmarks.push({
        login: user.login,
        name: user.name,
       avatar_url: user.avatar_url
        });
    }
    saveBookmarks();
    renderBookmarkButton(user);
}
function renderBookmarkButton(user) {
    const btn = document.querySelector(".bookmark-btn");

    if (!btn) return;

    btn.textContent = isBookmarked(user)
        ? "★supprimer de Favorites"
        : "☆ Ajouter au Favorites";

    btn.onclick = () => toggleBookmark(user);
}

function renderFavorites() {
    favoritesList.innerHTML = "";

    if (state.bookmarks.length === 0) {
        favoritesList.innerHTML = "<p>Aucun favorites</p>";
        return;
    }

    state.bookmarks.forEach(user => {
        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${user.avatar_url}" width="40">
            <span>${user.login}</span>
            <button data-login="${user.login}">Ouvrir</button>
            <button data-remove="${user.login}">X</button>
        `;

        favoritesList.appendChild(div);
    });

    favoritesList.onclick = (e) => {
        const login = e.target.dataset.login;

        if (login) {
            searchInput.value = login;
            handleSearch();
        }

        const remove = e.target.dataset.remove;

        if (remove) {
            state.bookmarks = state.bookmarks.filter(b => b.login !== remove);
            saveBookmarks();
            renderFavorites();
        }
    };

    hideAll();
    favoritesSection.classList.remove("hidden");
}
searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});

favoritesBtn.addEventListener("click", renderFavorites);

document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesCount();
    showWelcome();
});