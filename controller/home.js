// home.js : gestion du header sur l'accueil
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("nav-btn-login");
  const profileBtn = document.getElementById("nav-btn-profile");
  const logoutBtn = document.getElementById("nav-btn-logout");

  if (auth.isAuthenticated()) {
    // Cache "Se connecter"
    if (loginLink) loginLink.style.display = "none";

    // Affiche le bouton Profil
    if (profileBtn) profileBtn.style.display = "inline";

    // Affiche logout et ajoute listener
    if (logoutBtn) {
      logoutBtn.style.display = "inline";
      logoutBtn.addEventListener("click", () => {
        auth.logout();
        window.location.href = "index.html"; // retour accueil
      });
    }
  } else {
    // Pas connecté : login visible, profil et logout cachés
    if (loginLink) loginLink.style.display = "inline";
    if (profileBtn) profileBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});
