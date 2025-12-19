# **README.md – CelestIA **

```markdown
# CelestIA 🌌

[![HTML](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML) 
[![CSS](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS) 
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript) 
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-%23121011.svg?style=flat&logo=github&logoColor=white)](https://<ton-username>.github.io/CelestIA/)

---

## 🌌 Présentation

**CelestIA** est un projet réalisé dans le cadre de la formation CDA.  
C’est un site web simulant la gestion d’un utilisateur avec **inscription, connexion et profil**.

Fonctionnalités principales :

- Page d’accueil avec navigation dynamique (Login → Profil si connecté)  
- Page d’inscription et de connexion fonctionnelle  
- Profil minimaliste affichant le nom utilisateur  
- Header dynamique et responsive  
- Déploiement sur GitHub Pages  

---

## 🖼 Capture d’écran

![Accueil](assets/img/mockup/CelestIA.png)  
*Exemple de la page d’accueil*

![Profil](assets/mockup/390-Accueil.png)  
*Exemple de la page profil*



---

## 📄 Pages

| Page            | URL                  | Description |
|-----------------|--------------------|-------------|
| Accueil          | `index.html`       | Page principale, affiche login ou profil + logout si connecté |
| Inscription      | `register.html`    | Formulaire pour créer un utilisateur |
| Connexion        | `login.html`       | Formulaire de connexion, redirection vers profil |
| Profil           | `profile.html`     | Affiche dynamiquement le nom de l’utilisateur, logout disponible |

---

## ⚙ Fonctionnalités

- Inscription et connexion simulées avec **LocalStorage**  
- Vérification de l’état connecté (`isLogged`)  
- Redirection automatique vers login si non connecté  
- Header dynamique :  
  - Affiche “Se connecter” si utilisateur non connecté  
  - Affiche “Profil” et logout si connecté  
- Profil minimaliste (nom affiché dynamiquement)  

---

## 🛠 Technologies utilisées

- **HTML5**  
- **CSS3** (responsive mobile first)  
- **JavaScript** (vanilla JS)  
- **LocalStorage** pour la gestion de l’utilisateur  
- **Git / GitHub** pour le versionnement et le déploiement  

---

## 🗂 Structure des fichiers

```

CelestIA/
│
├─ index.html
├─ register.html
├─ login.html
├─ profile.html
│
├─ css/
│   ├─ reset.css
│   └─ style.css
│
├─ assets/
│   ├─ img/
│   │   ├─ logo-home.png
│   │   ├─ logout.svg
│   │   └─ profile.svg
│
├─ controller/
│   ├─ auth.js
│   ├─ home.js
│   ├─ login.js
│   ├─ register.js
│   └─ profile.js
│
└─ README.md

````

---

## 🚀 Installation et utilisation

1. **Cloner le dépôt** :

```bash
git clone https://github.com/Effy-93/CelestIA.git
````

2. **Ouvrir `index.html`** dans un navigateur moderne.
3. **Tester l’inscription et la connexion**.
4. La page profil affichera dynamiquement le nom de l’utilisateur.

> 💡 L’état de connexion est conservé dans le **LocalStorage**.
> Pour réinitialiser : ouvrir les DevTools → Application → LocalStorage → Supprimer `user` et `isLogged`.

---

## 📈 Checklist projet

### Structure et navigation

* [x] Pages accueil, inscription, connexion, profil
* [x] Navigation fluide et header dynamique

### CSS / Design

* [x] Style global appliqué
* [x] Responsive mobile first
* [x] Boutons et liens cohérents
* [x] Maquette respectée (accueil stylisé, profil minimaliste)

### JavaScript / Logique

* [x] Authentification avec LocalStorage
* [x] Vérification état connecté (`isLogged`)
* [x] Redirection automatique si non connecté
* [x] Affichage dynamique du nom sur profil
* [x] Header dynamique sur toutes les pages
* [x] Validation basique des formulaires
* [ ] Multi-utilisateurs (optionnel)
* [ ] Profil enrichi (email, stats…)
* [ ] SessionStorage pour info temporaire (optionnel)

### SEO / bonnes pratiques

* [x] `<title>` unique
* [x] `<meta description>`
* [x] H1/H2 correctement utilisés
* [x] `alt` sur toutes les images
* [x] Navigation accessible
* [ ] SEO avancé (Open Graph, favicon, sitemap)

### Git / Déploiement

* [x] Dépôt GitHub clair
* [x] Organisation fichiers claire
* [x] Site déployé sur GitHub Pages

---

## 📌 Améliorations futures

* Ajouter informations complémentaires sur le profil (email, date d’inscription…)
* Multi-utilisateurs
* Amélioration de l’UX et stylisation des boutons
* SEO avancé

---

## Auteur

**Eva Philippo** – Projet de formation Concepteur Développeu d'Application



---

