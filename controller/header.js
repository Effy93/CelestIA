import { auth } from "../model/user.js";
import { setupLogout } from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {
  let loginBtn = document.getElementById("nav-btn-login");
  const profileBtn = document.getElementById("nav-btn-profile");
  const logoutBtn = document.getElementById("nav-btn-logout");

  // Remplace le <a> login par le composant SVG stylé
  if (loginBtn) {
    loginBtn.outerHTML = `
      <div id="nav-btn-login" aria-label="User Login Button" tabindex="0" role="button" class="user-profile">
        <div class="user-profile-inner">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="Layer 2" id="Layer_2">
              <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
            </g>
          </svg>
        </div>
      </div>`;

    // récupérer le nouveau bouton
    loginBtn = document.getElementById("nav-btn-login");
  }

  // Affichage selon connexion
  if (auth.isAuthenticated()) {
    if (loginBtn) loginBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline";
    if (logoutBtn) {
      logoutBtn.style.display = "inline";
      setupLogout(logoutBtn);
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline";
    if (profileBtn) profileBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // Navigation login
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
