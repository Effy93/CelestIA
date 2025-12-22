import { auth } from "../model/user.js";

export function setupLogout(logoutBtn) {
  if (!logoutBtn) return;

  // Sécurité : empêche les doubles bindings (empeche la double alert si double ecoute)
  logoutBtn.replaceWith(logoutBtn.cloneNode(true));
  logoutBtn = document.getElementById("nav-btn-logout");

  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (!confirmLogout) return;

    auth.logout();
    window.location.href = "index.html";
  });
}
