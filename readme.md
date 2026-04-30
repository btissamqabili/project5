# GitHub Finder

Application web développée en **HTML, CSS et JavaScript Vanilla** permettant de rechercher des profils GitHub, consulter leurs statistiques publiques et gérer une liste de favoris persistante avec **localStorage**.

## Fonctionnalités

- Recherche d’un utilisateur GitHub
- Affichage du profil complet :
  - avatar
  - nom
  - pseudo
  - bio
  - followers / following
  - repositories publics
- Affichage des top repositories
- Gestion des erreurs (utilisateur introuvable)
- Ajout / suppression des favoris
- Persistance des favoris avec `localStorage`
- Compteur dynamique des favoris
- Interface dark mode responsive

## Technologies utilisées

- HTML5
- CSS3
- JavaScript Vanilla
- GitHub Public API
- localStorage

## API utilisée

https://api.github.com/users/{username}

## Structure du projet

project/
│── index.html
│── style.css
│── index.js
│── README.md
│── images/

