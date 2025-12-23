import { auth } from "../model/user.js";
import { confirmLogout } from "../view/show-message.js";

export function setupLogout(logoutBtn) {
  if (!logoutBtn) return;

  logoutBtn.replaceWith(logoutBtn.cloneNode(true));
  logoutBtn = document.getElementById("nav-btn-logout");

  logoutBtn.addEventListener("click", async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) return;

    auth.logout();
    window.location.href = "index.html";
  });
}
