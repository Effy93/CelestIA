// profile.js : affiche le nom de l'utilisateur et gère le header sur profile.html
document.addEventListener("DOMContentLoaded", () => {
  const userNameElement = document.getElementById("userName");
  const loginLink = document.getElementById("nav-btn-login");
  const profileBtn = document.getElementById("nav-btn-profile");
  const logoutBtn = document.getElementById("nav-btn-logout");

  // Redirection si pas connecté
  if (!auth.isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  // Récupère l'utilisateur depuis localStorage
  const user = auth.getUser();
  if (user && user.name) {
    userNameElement.textContent = `Bienvenue, ${user.name}!`;
  }

  // Sur profil : cacher login et profil
  if (loginLink) loginLink.style.display = "none";
  if (profileBtn) profileBtn.style.display = "none";

  // Logout visible et fonctionnel
  if (logoutBtn) {
    logoutBtn.style.display = "inline";
    logoutBtn.addEventListener("click", () => {
      auth.logout();
      window.location.href = "index.html"; // retour accueil
    });
  }
});
